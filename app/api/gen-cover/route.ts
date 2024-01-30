import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { currentUser } from "@clerk/nextjs";
import { downloadAndUploadImage } from "@/lib/s3";
import { genUuid } from "@/lib";
import { getOpenAIClient } from "@/services/openai";
import { getUserCredits } from "@/services/order";
import { insertCover } from "@/models/cover";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  try {
    const { description } = await req.json();
    if (!description) {
      return respErr("invalid params");
    }

    const user_email = user.emailAddresses[0].emailAddress;

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
    const s3_img = await downloadAndUploadImage(
      raw_img_url,
      process.env.AWS_BUCKET || "trysai",
      `covers/${img_uuid}.png`
    );
    const img_url = s3_img.Location;

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
    };
    await insertCover(cover);

    return respData(cover);
  } catch (e) {
    console.log("gen cover failed: ", e);
    return respErr("gen cover failed");
  }
}
