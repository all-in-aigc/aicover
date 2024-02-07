'use client';

import Image from "next/image";
import { useState } from "react";
import { CaseTabList, HbCoverList } from "@/public/constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { ICaseDetail } from "@/types/case";
import CaseDetail from ".";

export default function CaseTabs() {
  const [data, setData] = useState<ICaseDetail | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (_data: typeof HbCoverList[0]) => {
    const res = {
      title: _data.name,
      urls: [_data.coverUrl],
      tag: ['品牌文化', '节庆热点'],
      desc: '这是一段描述',
      cover: true,
    };
    setData(res);
    setOpen(true);
  };

  return (
    <div className="mt-[58px]">
      <Tabs defaultValue="all">
        <div className="mb-[48px] flex justify-center overflow-auto scrollbar-hidden">
          <TabsList className="mx-auto">
            {CaseTabList.map(caseTab => (
              <TabsTrigger value={caseTab.value} key={caseTab.value}>
                {caseTab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {CaseTabList.map(caseTab => (
          <TabsContent
            className="w-[1088px] mx-auto flex flex-wrap mt-0"
            value={caseTab.value}
            key={caseTab.value}
          >
            {HbCoverList.map(cover => (
              <div key={cover.coverUrl} className="mb-[64px] relative basis-1/3">
                <div className="w-[240px] relative hover:rotate-[2deg] transition-transform" onClick={() => handleOpen(cover)}>
                  <Image
                    width={240}
                    height={397}
                    src={cover.coverUrl}
                    className="rounded-[8px] cursor-pointer"
                    onClick={() => { }}
                    unoptimized
                    alt=""
                  />
                  <Image
                    width={240}
                    height={0}
                    src="/hb_bottom.png"
                    className="absolute left-0 right-0 bottom-0 cursor-pointer"
                    style={{ height: 'unset' }}
                    unoptimized
                    alt=""
                  />
                </div>
                <p className="w-[240px] mt-[24px] text-[17px] leading-[24px] text-black/90 text-center">
                  {cover.name}
                </p>
              </div>
            ))}
            <HoverCard>
              <HoverCardTrigger className="flex-1 text-center">
                <ins className="text-center cursor-pointer">我要赞助品牌封面</ins>
              </HoverCardTrigger>
              <HoverCardContent className="w-[200px] flex flex-col items-center text-black/60 text-[16px]">
                <Image
                  width={120}
                  height={120}
                  src="https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240203225316.png"
                  alt=""
                />
                <p className="mt-[12px]">扫码添加客服微信</p>
                <p>沟通品牌赞助合作</p>
              </HoverCardContent>
            </HoverCard>
          </TabsContent>
        ))}
      </Tabs>
      <CaseDetail open={open} onOpenChange={setOpen} data={data} />
    </div>
  );
}