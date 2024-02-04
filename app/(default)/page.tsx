import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { Metadata } from "next";
import { getCovers } from "@/models/cover";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}`,
    },
  };
}

export default async function () {
  const covers = await getCovers(1, 60);

  return (
    <div className="w-full px-6">
      <Hero />
      <Input />
      <Covers cate="latest" covers={covers} showTab={true} />
    </div>
  );
}
