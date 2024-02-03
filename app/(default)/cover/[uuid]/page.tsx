import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { findCoverByUuid, getRandomCovers } from "@/models/cover";

import { Button } from "@/components/ui/button";
import Consult from "@/components/consult";
import Covers from "@/components/covers";
import Download from "@/components/download";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { Metadata } from "next";
import Share from "@/components/share";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  let description = "";

  if (params.uuid) {
    const cover = await findCoverByUuid(params.uuid);
    if (cover) {
      description = cover.img_description;
    }
  }

  return {
    title: `AI 红包封面预览 - `,
    description: `${description}, by AI 红包封面生成器 ｜ AI Cover`,
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/cover/${params.uuid}`,
    },
  };
}

export default async function ({ params }: { params: { uuid: string } }) {
  const cover = await findCoverByUuid(params.uuid);
  if (!cover || cover.status !== 1) {
    return (
      <div className="text-center text-primary py-40">
        封面图片审核中，暂不可访问。
      </div>
    );
  }
  return (
    <>
      {cover && (
        <section>
          <div className="mx-auto w-full max-w-7xl px-5 py-4 md:px-10 md:py-4 ">
            <div className="flex flex-col items-center ">
              <section className=" w-full rounded-xl">
                <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-24">
                  <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
                    <a
                      href={`/cover/${cover.uuid}`}
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

                    <div className="sm:max-w-sm md:max-w-md lg:max-w-lg">
                      {cover.created_user && (
                        <a className="group block flex-shrink-0">
                          <div className="flex items-center">
                            <div>
                              <Avatar className="cursor-pointer">
                                <AvatarImage
                                  src={cover.created_user.avatar_url}
                                  alt={cover.created_user.nickname}
                                />
                                <AvatarFallback>
                                  {cover.created_user.nickname || "🧧"}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-3">
                              <p className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                                {cover.created_user.avatar_url
                                  ? cover.created_user.nickname
                                  : "匿名用户"}
                              </p>
                            </div>
                          </div>
                        </a>
                      )}

                      <p className="mt-4 mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12">
                        "{cover.img_description}"
                      </p>

                      <div className="text-sm text-[#636262] text-left">
                        {cover.is_awesome ? (
                          <Consult cover={cover} />
                        ) : (
                          <Download cover={cover} />
                        )}

                        <Share
                          shareUrl={`${process.env.WEB_BASE_URI}/cover/${cover.uuid}`}
                        />
                      </div>

                      {cover.is_awesome ? (
                        <p className="text-slate-500 text-sm py-8">
                          添加客服微信，截图告知客服你想要购买的红包封面图片，付款成功后，客服给你发送图片源文件，上传图片到微信红包封面开放平台
                          <a
                            href="https://cover.weixin.qq.com/cgi-bin/mmcover-bin/readtemplate?t=page/index#/make"
                            target="_blank"
                            className="text-primary"
                          >
                            定制你的红包封面👉
                          </a>
                        </p>
                      ) : (
                        <p className="text-slate-500 text-sm py-8">
                          此处下载的封面图片，不能直接用于微信发红包。你可以上传到微信红包封面开放平台，
                          <a
                            href="https://cover.weixin.qq.com/cgi-bin/mmcover-bin/readtemplate?t=page/index#/make"
                            target="_blank"
                            className="text-primary"
                          >
                            定制你的红包封面👉
                          </a>
                          <br />
                          <br />
                          微信红包封面图片要求在 500k
                          以内，如果下载的图片过大，请自行
                          <a
                            href="https://tinypng.com/"
                            target="_blank"
                            className="text-primary"
                          >
                            压缩图片👉
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <h2 className="text-xl font-semibold capitalize mt-8 md:text-3xl md:my-4">
                更多封面
              </h2>

              <div className="mb-8 grid w-full grid-cols-1 md:mb-12 md:grid-cols-1 md:gap-4 lg:mb-16">
                <Covers cate="random" showTab={false} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
