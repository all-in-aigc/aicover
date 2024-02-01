import { findUserByEmail, insertUser } from "@/models/user";
import { respData, respErr, respErrWithStatus } from "@/lib/resp";

import { NextRequest } from "next/server";
import { User } from "@/types/user";
import { genUuid } from "@/lib";
import { getUser } from "@/services/auth";
import { getUserCredits } from "@/services/order";

export async function POST(req: NextRequest) {
  const userToken = req.cookies.get("user-token");
  if (!userToken || !userToken.value) {
    return respErrWithStatus("no auth", 401);
  }
  const user = await getUser(userToken.value);
  if (!user || !user.uuid) {
    return respErrWithStatus("invalid user token", 401);
  }
  const user_email = user.email;
  const user_uuid = user.uuid;

  try {
    let userInfo: User = {
      email: user_email,
      nickname: user.nickname || "",
      avatar_url: user.avatar_url,
      uuid: user_uuid,
      openid: user.openid,
      platform: user.platform,
    };

    const existUser = await findUserByEmail(user_email);
    if (existUser) {
      userInfo.uuid = existUser.uuid;
    } else {
      await insertUser(userInfo);
    }

    const user_credits = await getUserCredits(user_email);
    userInfo.credits = user_credits;

    return respData(userInfo);
  } catch (e) {
    console.log("get user info failed");
    return respErr("get user info failed");
  }
}
