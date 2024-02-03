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

  const handleDownload = async (e: any) => {
    if (user === null) {
      toast.error("请先登录");
      return;
    }
    if (!user) {
      return;
    }
    if (!user.credits || user.credits.left_credits <= 0) {
      toast.error("余额不足，请先充值");
      return;
    }

    e.preventDefault();
    try {
      const response = await fetch(cover.img_url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${cover.uuid}.png`); // 设置下载的文件名
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("download img_url failed:", error);
      toast.error("下载出错");
    }
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
