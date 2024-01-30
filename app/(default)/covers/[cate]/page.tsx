import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";

export default function ({ params }: { params: { cate: string } }) {
  return (
    <div className="w-full px-6">
      <Hero />
      <Input />
      <Covers cate={params.cate} showTab={true} />
    </div>
  );
}
