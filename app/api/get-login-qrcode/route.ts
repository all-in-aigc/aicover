import { respData, respErr } from "@/lib/resp";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiUrl = `${process.env.AUTH_BASE_URI}/user-login-qrcode`;
    const params = {};
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const { code, message, data } = await resp.json();
    console.log("get login qroce", code, message, data);
    if (code !== 0) {
      return respErr(message);
    }

    return respData(data);
  } catch (e) {
    console.log("get login qrcode failed: ", e);
    return respErr("get login qrcode failed");
  }
}
