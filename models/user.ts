import { User } from "@/types/user";
import { getDb } from "@/models/db";

export async function insertUser(user: User) {
  const createdAt: string = new Date().toISOString();

  const db = await getDb();
  const res = await db.query(
    `INSERT INTO users 
      (email, nickname, avatar_url, created_at, uuid) 
      VALUES 
      ($1, $2, $3, $4, $5)
  `,
    [user.email, user.nickname, user.avatar_url, createdAt, user.uuid]
  );

  return res;
}

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const db = getDb();
  const res = await db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const user: User = {
    email: row.email,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    created_at: row.created_at,
    uuid: row.uuid,
  };

  return user;
}

export async function findUserByUuid(uuid: string): Promise<User | undefined> {
  const db = getDb();
  const res = await db.query(`SELECT * FROM users WHERE uuid = $1 LIMIT 1`, [
    uuid,
  ]);
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const user: User = {
    email: row.email,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    created_at: row.created_at,
    uuid: row.uuid,
  };

  return user;
}
