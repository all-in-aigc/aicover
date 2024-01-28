"use client";

import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import Image from "next/image";

export default function () {
  const { covers, setCovers } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const fetchCovers = async (page: number) => {
    try {
      const params = {
        page: page,
        limit: 30,
      };

      setLoading(true);
      const resp = await fetch("/api/get-covers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const { code, message, data } = await resp.json();
      setLoading(false);

      if (data) {
        setCovers(data);
      }
    } catch (e) {
      console.log("fetch covers failed", e);
    }
  };

  useEffect(() => {
    fetchCovers(1);
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 my-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-3xl font-normal md:text-2xl ">全部红包封面</h2>
          <div className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
            <p className="text-[#636262]"></p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
          {loading ? (
            <div className="text-center mx-auto">loading...</div>
          ) : (
            <>
              {covers &&
                covers.map((cover: Cover, idx: number) => {
                  return (
                    <div
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
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
