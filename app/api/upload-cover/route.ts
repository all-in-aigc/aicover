import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";
import { currentUser } from "@clerk/nextjs";
import { findUserByEmail } from "@/models/user";
import { genUuid } from "@/lib";
import { insertCover } from "@/models/cover";
import { uploadImage } from "@/lib/s3";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }
  const user_email = user.emailAddresses[0].emailAddress;

  let user_uuid = "";
  const user_info = await findUserByEmail(user_email);
  if (user_info && user_info.uuid) {
    user_uuid = user_info.uuid;
  }

  const formData = await req.formData();

  const img_description = formData.get("img_description") as string;
  const llm_name = formData.get("llm_name") as string;
  const img_file = formData.get("file") as File;

  const img_size = img_file.size;
  const img_type = img_file.type;

  if (!img_type.startsWith("image/")) {
    return respErr("invalid file type");
  }
  // max size: 10M
  if (img_size > 10485760) {
    return respErr("max file size up to 10MB");
  }

  console.log("img_file", img_file);

  try {
    const created_at = new Date().toISOString();
    const img_uuid = genUuid();

    const bytes = await img_file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const s3_img = await uploadImage(
      buffer,
      process.env.AWS_BUCKET || "trysai",
      `covers/${img_uuid}.png`
    );
    const img_url = s3_img.Location;

    const cover: Cover = {
      user_email: user_email,
      img_description: img_description,
      img_size: `${img_size}B`,
      img_url: img_url,
      llm_name: llm_name,
      created_at: created_at,
      uuid: img_uuid,
      status: 0,
      user_uuid: user_uuid,
      is_uploaded: true,
    };
    await insertCover(cover);

    return respData(cover);
  } catch (e) {
    console.log("upload cover failed: ", e);
    return respErr("upload cover failed");
  }
}
