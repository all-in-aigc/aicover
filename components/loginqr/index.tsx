"use client";

import { useEffect, useState } from "react";

import Cookie from "js-cookie";
import { LoginQrcode } from "@/types/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  const [qrcode, setQrcode] = useState<LoginQrcode | null>(null);

  const setUserToken = (value: string) => {
    Cookie.set("user-token", value, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  };

  const fetchLoginQrcode = async () => {
    try {
      const resp = await fetch("/api/get-login-qrcode", {
        method: "POST",
      });
      const { code, message, data } = await resp.json();
      console.log("get login qrcode: ", data);

      if (data) {
        setQrcode(data);
      }
    } catch (e) {
      toast.error("获取登录二维码失败");
    }
  };

  const fetchCheckLogn = async (login_code: string) => {
    console.log("check login");
    const params = {
      login_code: login_code,
    };
    const resp = await fetch("/api/check-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const { code, message, data } = await resp.json();
    console.log("check login: ", code, message, data);

    if (code !== 0) {
      if (message === "wait login") {
        return;
      }

      // check login failed, refresh login qrcode
      fetchLoginQrcode();
      return;
    }

    // login ok
    if (data && data.token) {
      console.log("login ok", data);
      setUserToken(data.token);
      toast.success("登陆成功");
      router.push(`/`);
    }
  };

  useEffect(() => {
    fetchLoginQrcode();

    let intervalId = setInterval(() => {
      console.log("This message will print every 10 seconds");
      fetchLoginQrcode();
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (qrcode && qrcode.login_code) {
      fetchCheckLogn(qrcode.login_code);

      let intervalId = setInterval(() => {
        fetchCheckLogn(qrcode.login_code);
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [qrcode]);

  return (
    <div className="mx-auto">
      {qrcode ? (
        <div className="flex flex-col items-center">
          <img className="w-60 h-60 rounded-md" src={qrcode.login_qrurl} />
          <div className="my-2">请微信扫码，关注公众号登录</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
