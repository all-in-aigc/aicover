"use client";

import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const [coversCount, setCoversCount] = useState(0);
  const [covers, setCovers] = useState<Cover[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserCovers = async (page: number) => {
    try {
      const params = {
        page: page,
        limit: 30,
      };

      setLoading(true);
      const resp = await fetch("/api/get-user-covers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.status === 401) {
        toast.error("请先登录");
        return;
      }

      const { data } = await resp.json();
      if (data) {
        setCovers(data.covers);
        setCoversCount(data.total);
      }
    } catch (e) {
      toast.error("fetch user covers failed");
      console.log("fetch user covers failed: ", e);
    }
  };

  useEffect(() => {
    fetchUserCovers(1);
  }, []);

  return (
    <div className="w-full px-6">
      <Hero covers_count={coversCount} loading={loading} />
      <Input />
      <Covers cate="mine" showTab={true} covers={covers} loading={loading} />
    </div>
  );
}
