export interface Order {
  order_no: string;
  created_at: string;
  user_email: string;
  amount: number;
  plan: string;
  expired_at: string;
  order_status: number;
  paied_at?: string;
  stripe_session_id?: string;
  credits: number;
  currency: string;
}
