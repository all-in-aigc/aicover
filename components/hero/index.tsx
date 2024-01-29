import { getCoversCount } from "@/models/cover";

export default async function () {
  const covers_count = await getCoversCount();

  return (
    <section className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-primary mt-8 md:mt-24">
        2024 新年快乐
      </h1>
      <h2 className="text-2xl md:text-4xl my-8 text-secondary-foreground">
        <span className="text-primary">{covers_count}</span> 张使用 AI
        生成的红包封面
      </h2>
    </section>
  );
}
