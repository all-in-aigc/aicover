import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";
import { getCovers } from "@/models/cover";

export async function POST(req: Request) {
  try {
    const { page } = await req.json();
    const limit = 30;

    const covers: Cover[] = await getCovers(page, limit);

    return respData(covers);
  } catch (e) {
    console.log("get covers failed", e);
    return respErr("get covers failed");
  }
}
