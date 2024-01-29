import { QueryResult, QueryResultRow } from "pg";

import { Cover } from "@/types/cover";
import { getDb } from "./db";

export async function insertCover(cover: Cover) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO covers 
        (user_email, img_description, img_size, img_url, llm_name, llm_params, created_at, uuid, status) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [
      cover.user_email,
      cover.img_description,
      cover.img_size,
      cover.img_url,
      cover.llm_name,
      cover.llm_params,
      cover.created_at,
      cover.uuid,
      cover.status,
    ]
  );

  return res;
}

export async function getCoversCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM covers`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function getUserCoversCount(user_email: string): Promise<number> {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM covers WHERE user_email = $1`,
    [user_email]
  );
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findCoverById(id: number): Promise<Cover | undefined> {
  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.id = $1`,
    [id]
  );
  if (res.rowCount === 0) {
    return;
  }

  const cover = formatCover(res.rows[0]);

  return cover;
}

export async function findCoverByUuid(
  uuid: string
): Promise<Cover | undefined> {
  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.uuid = $1`,
    [uuid]
  );
  if (res.rowCount === 0) {
    return;
  }

  const cover = formatCover(res.rows[0]);

  return cover;
}

export async function getRandomCovers(
  page: number,
  limit: number
): Promise<Cover[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.status = 1 order by random() limit $1 offset $2`,
    [limit, offset]
  );

  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getCovers(page: number, limit: number): Promise<Cover[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getUserCovers(
  user_email: string,
  page: number,
  limit: number
): Promise<Cover[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.user_email = $1 order by w.created_at desc limit $2 offset $3`,
    [user_email, limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getRecommendedCovers(
  page: number,
  limit: number
): Promise<Cover[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from covers as w left join users as u on w.user_email = u.email where w.is_recommended = true and w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export function getCoversFromSqlResult(
  res: QueryResult<QueryResultRow>
): Cover[] {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const covers: Cover[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const cover = formatCover(row);
    if (cover) {
      covers.push(cover);
    }
  });

  return covers;
}

export function formatCover(row: QueryResultRow): Cover | undefined {
  let cover: Cover = {
    id: row.id,
    user_email: row.user_email,
    img_description: row.img_description,
    img_size: row.img_size,
    img_url: row.img_url,
    llm_name: row.llm_name,
    llm_params: row.llm_params,
    created_at: row.created_at,
    uuid: row.uuid,
    status: row.status,
    is_recommended: row.is_recommended,
  };

  if (row.user_name || row.user_avatar) {
    cover.created_user = {
      email: row.user_email,
      nickname: row.user_name,
      avatar_url: row.user_avatar,
      uuid: row.user_uuid,
    };
  }

  try {
    cover.llm_params = JSON.parse(JSON.stringify(cover.llm_params));
  } catch (e) {
    console.log("parse cover llm_params failed: ", e);
  }

  return cover;
}
