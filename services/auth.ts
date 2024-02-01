import { User } from "@/types/user";
import moment from "moment";

export async function getUser(token: string): Promise<User | null> {
  try {
    const apiUrl = `${process.env.AUTH_BASE_URI}/user-info `;
    const resp = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { code, message, data } = await resp.json();
    if (!data || !data.openid) {
      console.log("get user info failed: ", code, message, data);
      return null;
    }

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
    console.log("get user failed: ", e);
    return null;
  }
}
