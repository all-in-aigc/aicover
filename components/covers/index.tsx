import {
  getCovers,
  getRandomCovers,
  getRecommendedCovers,
  getUserCovers,
} from "@/models/cover";

import { Cover } from "@/types/cover";
import Image from "next/image";
import Tabs from "../tabs";
import { currentUser } from "@clerk/nextjs";

export default async function ({
  cate,
  showTab,
}: {
  cate: string;
  showTab?: boolean;
}) {
  const page = 1;
  const limit = 60;

  let covers: Cover[] = [];
  if (cate === "featured") {
    covers = await getRecommendedCovers(page, limit);
  } else if (cate === "random") {
    covers = await getRandomCovers(page, limit);
  } else if (cate === "mine") {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return (
        <p className="flex items-center justify-center py-16 text-xl">
          user not login
        </p>
      );
    }
    const user_email = user.emailAddresses[0].emailAddress;
    covers = await getUserCovers(user_email, page, limit);
  } else {
    covers = await getCovers(page, limit);
  }

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
