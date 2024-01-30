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

export default function () {
  return (
    <div className="w-full px-6">
      <Hero />
      <Input />
      <Covers cate="latest" showTab={true} />
    </div>
  );
}
