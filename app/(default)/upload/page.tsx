import Form from "@/components/form";

export default function () {
  return (
    <div className="w-full px-6">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-primary mt-8 md:mt-24">
          上传封面图片
        </h1>
        <h2 className="text-2xl md:text-4xl my-8 text-secondary-foreground">
          让更多人看到你的创造力
        </h2>
        <div className="text-left">
          <Form />
        </div>
      </section>
    </div>
  );
}
