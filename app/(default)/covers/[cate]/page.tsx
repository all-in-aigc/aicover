import {
  getCovers,
  getCoversCount,
  getRandomCovers,
  getRecommendedCovers,
} from "@/models/cover";

import { Cover } from "@/types/cover";
import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { cate: string };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/covers/${params.cate}`,
    },
  };
}

export default async function ({ params }: { params: { cate: string } }) {
  const page = 1;
  const limit = 60;
  const cate = params.cate;
  let covers: Cover[] = [];

  if (cate === "featured") {
    covers = await getRecommendedCovers(page, limit);
  } else if (cate === "random") {
    covers = await getRandomCovers(page, limit);
  } else {
    covers = await getCovers(page, limit);
  }

  const covers_count = await getCoversCount();
  return (
    <div className="w-full px-6">
      <Hero covers_count={covers_count} />
      <Input />
      <Covers cate={params.cate} showTab={true} covers={covers} />
    </div>
  );
}
