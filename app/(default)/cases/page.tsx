'use client'

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronForwardCircle } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { CaseSwiperList, CaseSwiperDetail } from '@/public/constant';
import { ICaseDetail } from '@/types/case';
import CaseTabs from '@/components/case/CaseTabs';
import Contact from '@/components/case/Contact';
import CaseDetail from '@/components/case';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css';

export default function () {
  const [open, setOpen] = useState<boolean>(false);

  const [data, setData] = useState<ICaseDetail | null>(null);

  const swiperRef = useRef<SwiperRef>(null);

  const handleOpen = (_data: ICaseDetail) => {
    if (_data) {
      setOpen(true);
      setData(_data);
    }
  }

  return (
    <div className="overflow-auto">
      <Swiper
        ref={swiperRef}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        modules={[EffectFade, Navigation]}
        navigation={{ enabled: true, nextEl: 'next', prevEl: 'prev' }}
        simulateTouch={false}
        speed={1000}
      >
        {CaseSwiperList.map((d) => (
          <SwiperSlide key={d.imageUrl}>
            <div className="w-full h-[60vh] mx-auto bg-white bg-cover bg-center" style={{ backgroundImage: `url(${d.imageUrl})` }}>
              <div className="max-w-[1000px] w-full h-full mx-auto flex justify-center">
                <div className="w-[445px] mt-[15vh] mr-[70px] flex-shrink-0 text-white">
                  <span className="text-[40px] font-medium">{d.title}</span>
                  <p className="text-[17px] leading-[27px] mt-[12px] mb-[24px] opacity-90">{d.desc}</p>
                  <p className="text-[16px] opacity-90 cursor-pointer flex items-center" onClick={() => handleOpen(CaseSwiperDetail[d.id])}>
                    了解创意
                    <IoChevronForwardOutline className="ml-[4px] mt-[1px] opacity-50" />
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <Image
                    width={0}
                    height={0}
                    style={{ width: '25vh', height: '41vh', marginTop: '7vh', cursor: 'pointer', borderRadius: d.cover ? '8px' : 0 }}
                    src={d.hbUrl}
                    onClick={() => handleOpen(CaseSwiperDetail[d.id])}
                    unoptimized
                    alt=""
                  />
                  {d.cover && (
                    <Image
                      width={0}
                      height={0}
                      src="/hb_bottom.png"
                      className="absolute left-0 right-0 bottom-0 -translate-y-full cursor-pointer"
                      style={{ width: '100%', height: 'unset' }}
                      onClick={() => handleOpen(CaseSwiperDetail[d.id])}
                      unoptimized
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <IoChevronForwardCircle
          size={36}
          className="next absolute top-1/2 -translate-y-1/2 right-[calc((100vw-1000px)/2)] z-10 cursor-pointer opacity-50 text-white"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        />
        <IoChevronBackCircle
          size={36}
          className="prev absolute top-1/2 -translate-y-1/2 left-[calc((100vw-1000px)/2)] z-10 cursor-pointer opacity-50 text-white"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        />
        <Image
          unoptimized
          width={0}
          height={0}
          src="https://res.wx.qq.com/t/wx_fed/base/cover/red-envelope-cover-platform/res/img/case-header-bottom.5d6bf1a9.png"
          style={{ width: '100%', height: 'unset', position: 'absolute', left: 0, right: 0, bottom: -1, opacity: 1, zIndex: 11 }}
          alt=""
        />
      </Swiper>
      <CaseTabs />
      <CaseDetail open={open} onOpenChange={setOpen} data={data} />
      <Contact />
    </div>
  );
}