import { getCovers, getRandCovers } from "@/models/cover";
import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";

export async function POST(req: Request) {
  try {
    const { page, limit } = await req.json();

    const covers: Cover[] = await getRandCovers(page, limit);

    return respData(covers);
  } catch (e) {
    console.log("get covers failed", e);
    return respErr("get covers failed");
  }
}
