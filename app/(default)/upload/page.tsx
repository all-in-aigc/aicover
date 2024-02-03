import Form from "@/components/form";

export default function () {
  return (
    <div className="relative isolate bg-white px-6 py-8 md:py-16 lg:px-8">
      <section className="max-w-3xl mx-auto text-center">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-6xl">
            上传红包封面
          </h1>
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          审核通过后，用户可付费购买
        </h2>
        <div className="text-left">
          <Form />
        </div>
      </section>
    </div>
  );
}
