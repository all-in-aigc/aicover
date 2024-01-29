import { User } from "./user";

export interface Cover {
  id?: number;
  user_email: string;
  img_description: string;
  img_size: string;
  img_url: string;
  llm_name: string;
  llm_params?: any;
  created_at: string;
  created_user?: User;
  uuid: string;
  status: number;
  is_recommended?: boolean;
}
