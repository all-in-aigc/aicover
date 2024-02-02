import COS from "cos-nodejs-sdk-v5";
import { Readable } from "stream";
import axios from "axios";

const cos = new COS({
  SecretId: process.env.COS_AK,
  SecretKey: process.env.COS_SK,
});

export async function downloadAndUploadImage(
  imageUrl: string,
  bucket: string,
  key: string
) {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    return cos.putObject({
      Bucket: bucket,
      Region: process.env.COS_REGION || "",
      Key: key,
      StorageClass: "STANDARD",
      Body: response.data as Readable,
    });
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
