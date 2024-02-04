import {
  getAwesomeCovers,
  getCovers,
  getRandomCovers,
  getRecommendedCovers,
} from "@/models/cover";

import { Cover } from "@/types/cover";
import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";

export default async function ({ params }: { params: { cate: string } }) {
  const page = 1;
  const limit = 60;
  const cate = params.cate;

  let covers: Cover[] = [];
  if (cate === "featured") {
    covers = await getRecommendedCovers(page, limit);
  } else if (cate === "awesome") {
    covers = await getAwesomeCovers(page, limit);
  } else if (cate === "random") {
    covers = await getRandomCovers(page, limit);
  } else {
    covers = await getCovers(page, limit);
  }

  return (
    <div className="w-full px-6">
      <Hero />
      <Input />
      <Covers cate={params.cate} covers={covers} showTab={true} />
    </div>
  );
}
