"use client";

import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const { setCovers, user, fetchUserInfo } = useContext(AppContext);
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    console.log("description", description);
    if (!description) {
      toast.error("请输入红包封面描述");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      toast.error("请先登录");
      router.push("/sign-in");
      return;
    }

    if (user.credits && user.credits.left_credits < 1) {
      toast.error("余额不足，请先充值");
      router.push("/pricing");
      return;
    }

    try {
      const params = {
        description: description,
      };

      setLoading(true);
      const resp = await fetch("/api/gen-cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { code, message, data } = await resp.json();
      setLoading(false);

      if (resp.status === 401) {
        toast.error("请先登录");
        router.push("/sign-in");
        return;
      }
      console.log("gen wallpaper resp", resp);

      if (code !== 0) {
        toast.error(message);
        return;
      }

      fetchUserInfo();
      setDiscription("");

      toast.success("生成成功");
      if (data) {
        console.log("new cover", data);
        // setCovers((covers: Cover[]) => [data, ...covers]);
        router.push("/covers/mine");
      }
    } catch (e) {
      console.log("gen cover failed", e);
    }
  };

  useEffect(() => {
    if (description) {
      if (!user) {
        toast.error("请先登录");
        router.push("/sign-in");
        return;
      }
    }
  }, [description]);

  return (
    <div className="relative max-w-2xl mx-auto mt-4 md:mt-16">
      <input
        type="text"
        className="mb-1 h-9 w-full rounded-md border border-solid border-primary px-3 py-6 text-sm text-[#333333] focus:border-primary"
        placeholder="输入要生成的红包封面描述"
        ref={inputRef}
        value={description}
        onChange={(e) => setDiscription(e.target.value)}
        onKeyDown={handleInputKeydown}
      />
      {loading ? (
        <button
          className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-primary px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
          disabled
        >
          生成中...
        </button>
      ) : (
        <button
          className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-primary border-primary px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
          onClick={handleSubmit}
        >
          生成封面
        </button>
      )}
    </div>
  );
}
