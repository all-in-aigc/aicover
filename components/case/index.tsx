'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CaseDetailProps } from '@/types/case';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

const CaseDetail: React.FC<CaseDetailProps> = function CaseDetail(props) {
  const { open, onOpenChange, data } = props;

  const [url, setUrl] = useState<string>(data?.urls?.[0] || '');

  useEffect(() => {
    setUrl(data?.urls?.[0] || '');
  }, [data])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-[960px] h-[640px] outline-none p-0 flex gap-0">
        <div className="w-[640px] flex-shrink-0 bg-black/[0.03]">
          <div className="mt-[32px] mb-[22px]">
            <div className="w-[300px] mx-auto relative">
              <Image
                width={300}
                height={0}
                style={{ height: 'auto' }}
                src={url}
                alt=""
              />
              {data?.cover && (
                <Image
                  width={0}
                  height={0}
                  src="/hb_bottom.png"
                  className="absolute left-0 right-0 bottom-0 cursor-pointer"
                  style={{ width: '100%', height: 'unset' }}
                  unoptimized
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {data?.urls.map((u) => (
              <div key={u} className="w-[56px] h-[56px] bg-white border border-solid border-[#fa5151] cursor-pointer rounded-sm flex justify-center items-center">
                <Image width={24} height={0} style={{ height: 'auto' }} src={u} alt="" unoptimized />
              </div>
            ))}
          </div>
        </div>
        <div className="w-0 flex-grow px-[32px] py-[24px] flex flex-col">
          {data?.title ? <p className="text-black/90 font-bold text-[17px] flex-shrink-0">{data.title}</p> : null}
          <div className="mt-[16px] mb-[20px] flex-shrink-0">
            {Array.isArray(data?.tag) && data?.tag.length > 0 && data.tag.map(t => (
              <div key={t} className="inline-block px-[4px] py-[2px] leading-[17px] rounded-[2px] text-[#fa5251] bg-[rgba(243,85,67,.1)] text-[12px] font-bold mr-[12px]">
                {t}
              </div>
            ))}
          </div>
          {data?.desc ? <div className="h-0 flex-grow text-[14px] leading-[27px] text-black/50">{data.desc}</div> : null}
          <HoverCard>
            <HoverCardTrigger>
              <ins className="text-[14px] text-black/60 cursor-pointer">
                我想要领取这个品牌封面🔥
              </ins>
            </HoverCardTrigger>
            <HoverCardContent align="start" side="top" className="w-[250px] flex flex-col items-center text-[16px] text-black/50">
              <Image
                width={160}
                height={160}
                src="https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240203225316.png"
                alt=""
              />
              <p className="mt-[12px]">请扫码添加客服微信获得封面</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CaseDetail;