import {
  getCovers,
  getRandomCovers,
  getRecommendedCovers,
} from "@/models/cover";
import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";

export async function POST(req: Request) {
  try {
    const { cate, page, limit } = await req.json();
    let covers: Cover[] = [];

    if (cate === "featured") {
      covers = await getRecommendedCovers(page, limit);
    } else if (cate === "random") {
      covers = await getRandomCovers(page, limit);
    } else {
      covers = await getCovers(page, limit);
    }

    return respData(covers);
  } catch (e) {
    console.log("get covers failed", e);
    return respErr("get covers failed");
  }
}
