import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "@/types/user";
import moment from "moment";

export async function getUser(token: string): Promise<User | null> {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    const user: User = {
      email: `${data.openid}@${data.platform}`,
      nickname: data.nickname,
      avatar_url: data.avatar_url,
      created_at: moment.unix(data.created_at).toISOString(),
      uuid: data.uuid,
      openid: data.openid,
      platform: data.platform,
    };

    return user;
  } catch (e) {
    console.log("parse jwt token failed: ", e);
    return null;
  }
}
