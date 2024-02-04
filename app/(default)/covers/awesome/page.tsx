import Covers from "@/components/covers";
import { getAwesomeCovers } from "@/models/cover";

export default async function () {
  const covers = await getAwesomeCovers(1, 60);

  return (
    <div className="relative isolate bg-white px-6 py-8 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-6xl">
          精品红包封面
        </h1>
      </div>
      <h2 className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        优质作者，匠心创作
      </h2>
      <Covers cate="awesome" covers={covers} showTab={false} />
    </div>
  );
}
