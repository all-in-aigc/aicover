import Covers from "@/components/covers";

export default function ({ params }: { params: { cate: string } }) {
  return (
    <div className="w-full px-6">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-primary mt-8 md:mt-24">
          精品红包封面图
        </h1>
        <h2 className="text-2xl md:text-4xl my-8 text-secondary-foreground">
          联系客服获取源文件
        </h2>
      </section>
      <Covers cate={params.cate} showTab={false} />
    </div>
  );
}
