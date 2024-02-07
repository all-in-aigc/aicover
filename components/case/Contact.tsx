'use client';

import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export default function Contact() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="w-[20px] box-content fixed right-0 top-1/2 -translate-y-1/2 z-[10000] rounded-tl-[8px] rounded-bl-[8px] bg-white px-[8px] py-[12px] cursor-pointer shadow-[0_4px_30px_0_rgba(0,0,0,.1)]">
          <p className="text-[14px] text-black/50 text-center leading-[1.5] break-all whitespace-break-spaces">
            <span className="text-[12px] text-red-600/60 mb-[2px]">1v1</span>
            专业定制
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" side="left" className="w-[200px] flex flex-col items-center text-[16px] text-black/50">
        <Image
          width={100}
          height={100}
          src="https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240203225316.png"
          alt=""
        />
        <p className="mt-[12px]">如想定制专属封面</p>
        <p className="">扫码添加客服微信</p>
      </HoverCardContent>
    </HoverCard>
  )
}