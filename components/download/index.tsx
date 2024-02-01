"use client";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Cover } from "@/types/cover";
import { FaDownload } from "react-icons/fa";
import { toast } from "sonner";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ({ cover }: { cover: Cover }) {
  const { user } = useContext(AppContext);

  const handleDownload = async () => {
    if (!user || !user.uuid) {
      toast.error("请先登录");
      return;
    }
    if (!user.credits || user.credits.left_credits <= 0) {
      toast.error("余额不足，请先充值");
      return;
    }

    const img_url = cover.img_url;
    window.location.href = img_url;
  };

  return (
    <a onClick={handleDownload}>
      <Button className="mt-4 mx-auto">
        <FaDownload className="mr-2" />
        下载封面图片
      </Button>
    </a>
  );
}
