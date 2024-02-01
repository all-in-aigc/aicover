import { Cover } from "@/types/cover";
import Image from "next/image";
import Tabs from "@/components/tabs";

export default function ({
  cate,
  showTab,
  covers,
}: {
  cate: string;
  showTab?: boolean;
  covers: Cover[] | null;
}) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 my-16">
        {showTab && (
          <div className="mx-auto w-full max-w-3xl text-center">
            <Tabs cate={cate} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
          {false ? (
            <div className="text-center mx-auto">loading...</div>
          ) : (
            <>
              {covers &&
                covers.map((cover: Cover, idx: number) => {
                  return (
                    <a
                      href={`/cover/${cover.uuid}`}
                      key={idx}
                      className="relative overflow-hidden max-w-[280px] mx-auto cursor-pointer"
                    >
                      <Image
                        src={cover.img_url}
                        alt={cover.img_description}
                        width="280"
                        height="420"
                        className="w-full rounded-lg"
                      />

                      <img
                        src="/hb_bottom.png"
                        className="absolute bottom-0"
                        alt=""
                      />
                    </a>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
