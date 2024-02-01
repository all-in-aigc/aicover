import { respData, respErr } from "@/lib/resp";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { login_code } = await req.json();
    if (!login_code) {
      return respErr("invalid params");
    }

    const apiUrl = `${process.env.AUTH_BASE_URI}/user-check-login`;
    const params = {
      login_code: login_code,
    };
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const { code, message, data } = await resp.json();
    if (code !== 0) {
      return respErr(message);
    }

    return respData(data);
  } catch (e) {
    console.log("check login failed: ", e);
    return respErr("check login failed");
  }
}
