import { NextRequest, NextResponse } from "next/server";
import { respData, respErr, respErrWithStatus } from "@/lib/resp";

import { Cover } from "@/types/cover";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { downloadAndUploadImage } from "@/lib/s3";
import { downloadAndUploadImage as downloadAndUploadImageWithCos } from "@/lib/cos";
import { genUuid } from "@/lib";
import { getOpenAIClient } from "@/services/openai";
import { getUser } from "@/services/auth";
import { getUserCredits } from "@/services/order";
import { insertCover } from "@/models/cover";

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
    const { description } = await req.json();
    if (!description) {
      return respErr("invalid params");
    }

    const user_credits = await getUserCredits(user_email);
    if (!user_credits || user_credits.left_credits < 1) {
      return respErr("credits not enough");
    }

    const client = getOpenAIClient();

    const llm_name = "dall-e-3";
    const img_size = "1024x1792";

    const llm_params: ImageGenerateParams = {
      prompt: `Generate a brand story image about ${description}`,
      model: llm_name,
      n: 1,
      quality: "hd",
      response_format: "url",
      size: img_size,
      style: "vivid",
    };
    const created_at = new Date().toISOString();

    const res = await client.images.generate(llm_params);
    const raw_img_url = res.data[0].url;
    if (!raw_img_url) {
      return respErr("generate cover failed");
    }

    const img_uuid = genUuid();
    const img_name = encodeURIComponent(description);

    let img_url = "";

    if (process.env.COS_BUCKET) {
      const cos_img = await downloadAndUploadImageWithCos(
        raw_img_url,
        process.env.COS_BUCKET || "",
        `covers/${img_uuid}.png`
      );
      img_url = `https://${cos_img.Location}`;
    } else {
      const s3_img = await downloadAndUploadImage(
        raw_img_url,
        process.env.AWS_BUCKET || "",
        `covers/${img_uuid}.png`
      );
      img_url = s3_img.Location;
    }

    const cover: Cover = {
      user_email: user_email,
      img_description: description,
      img_size: img_size,
      img_url: img_url,
      llm_name: llm_name,
      llm_params: JSON.stringify(llm_params),
      created_at: created_at,
      uuid: img_uuid,
      status: 1,
      user_uuid: user_uuid,
      app_tag: process.env.APP_TAG,
    };
    await insertCover(cover);

    return respData(cover);
  } catch (e) {
    console.log("gen cover failed: ", e);
    return respErr("gen cover failed");
  }
}
