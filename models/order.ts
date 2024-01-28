import { Order } from "@/types/order";
import { QueryResultRow } from "pg";
import { getDb } from "@/models/db";

export async function insertOrder(order: Order) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO orders 
        (order_no, created_at, user_email, amount, plan, expired_at, order_status, credits, currency) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [
      order.order_no,
      order.created_at,
      order.user_email,
      order.amount,
      order.plan,
      order.expired_at,
      order.order_status,
      order.credits,
      order.currency,
    ]
  );

  return res;
}

export async function findOrderByOrderNo(
  order_no: number
): Promise<Order | undefined> {
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM orders WHERE order_no = $1 LIMIT 1`,
    [order_no]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const order = formatOrder(row);

  return order;
}

export async function updateOrderStatus(
  order_no: string,
  order_status: number,
  paied_at: string
) {
  const db = getDb();
  const res = await db.query(
    `UPDATE orders SET order_status=$1, paied_at=$2 WHERE order_no=$3`,
    [order_status, paied_at, order_no]
  );

  return res;
}

export async function updateOrderSession(
  order_no: string,
  stripe_session_id: string
) {
  const db = getDb();
  const res = await db.query(
    `UPDATE orders SET stripe_session_id=$1 WHERE order_no=$2`,
    [stripe_session_id, order_no]
  );

  return res;
}

export async function getUserOrders(
  user_email: string
): Promise<Order[] | undefined> {
  const now = new Date().toISOString();
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM orders WHERE user_email = $1 AND order_status = 2 AND expired_at >= $2`,
    [user_email, now]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  let orders: Order[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const order = formatOrder(row);
    orders.push(order);
  });

  return orders;
}

function formatOrder(row: QueryResultRow): Order {
  const order: Order = {
    order_no: row.order_no,
    created_at: row.created_at,
    user_email: row.user_email,
    amount: row.amount,
    plan: row.plan,
    expired_at: row.expired_at,
    order_status: row.order_status,
    paied_at: row.paied_at,
    stripe_session_id: row.stripe_session_id,
    credits: row.credits,
    currency: row.currency,
  };

  return order;
}
