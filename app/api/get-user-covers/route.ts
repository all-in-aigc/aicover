import { getCoversCount, getUserCovers } from "@/models/cover";
import { respData, respErr, respErrWithStatus } from "@/lib/resp";

import { NextRequest } from "next/server";
import { getUser } from "@/services/auth";

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
    const { page, limit } = await req.json();
    const covers = await getUserCovers(user_email, page, limit);
    const covers_count = await getCoversCount();

    return respData({
      total: covers_count,
      page: page,
      limit: limit,
      covers: covers,
    });
  } catch (e) {
    console.log("get user covers failed", e);
    return respErr("get user covers failed");
  }
}
