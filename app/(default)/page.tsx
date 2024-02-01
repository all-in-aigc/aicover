import { getCovers, getCoversCount } from "@/models/cover";

import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}`,
    },
  };
}

export default async function () {
  const page = 1;
  const limit = 60;
  const cate = "latest";

  const covers = await getCovers(page, limit);
  const covers_count = await getCoversCount();

  return (
    <div className="w-full px-6">
      <Hero covers_count={covers_count} />
      <Input />
      <Covers cate={cate} showTab={true} covers={covers} />
    </div>
  );
}
