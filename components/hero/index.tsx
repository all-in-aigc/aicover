import Producthunt from "@/components/producthunt";

export default function ({
  covers_count,
  loading,
}: {
  covers_count: number;
  loading?: boolean;
}) {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl md:text-6xl font-bold text-primary mt-8 md:mt-24">
        新年快乐，龙年大吉🐲
      </h1>
      <h2 className="text-2xl md:text-4xl my-8 text-secondary-foreground">
        <span className="text-primary">{loading ? "..." : covers_count}</span>{" "}
        张使用 AI 生成的红包封面
      </h2>
      {/* <Producthunt /> */}
    </section>
  );
}
