"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const tiers = [
  {
    name: "试用版",
    id: "try",
    href: "#",
    priceMonthly: "¥10.24",
    unit: "一次性支付",
    plan: "one-time",
    amount: 1024,
    currency: "cny",
    credits: 3,
    description: "",
    features: [
      "可生成 3 个 AI 红包封面",
      "1 个月内有效",
      "高清的图片质量",
      "较快的生成速度",
      "可下载 3 个 AI 红包封面",
    ],
    featured: true,
  },
  {
    name: "畅享版",
    id: "one-time-payment",
    href: "#",
    priceMonthly: "¥20.24",
    unit: "一次性支付",
    plan: "one-time",
    amount: 2024,
    currency: "cny",
    credits: 10,
    description: "",
    features: [
      "可生成 10 个 AI 红包封面",
      "1 个月内有效",
      "超清的图片质量",
      "更快的生成速度",
      "不限制 AI 红包封面下载次数",
    ],
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (
    plan: string,
    amount: number,
    currency: string,
    credits: number
  ) => {
    try {
      const params = {
        plan: plan,
        credits: credits,
        amount: amount,
        currency: currency,
      };

      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (response.status === 401) {
        setLoading(false);

        toast.error("need login");
        router.push("/sign-in");
        return;
      }

      const { code, message, data } = await response.json();
      if (!data) {
        setLoading(false);

        toast.error(message);
        return;
      }
      const { public_key, session_id } = data;

      const stripe = await loadStripe(public_key);
      if (!stripe) {
        setLoading(false);

        toast.error("checkout failed");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session_id,
      });
      console.log("result", result);

      if (result.error) {
        setLoading(false);

        // 处理错误
        toast.error(result.error.message);
      }
    } catch (e) {
      setLoading(false);

      console.log("checkout failed: ", e);

      toast.error("checkout failed");
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-8 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-6xl">
          付费方案
        </h1>
      </div>
      <h2 className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        选择一个付费方案，支付完成后可生成 AI 红包封面
      </h2>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-white shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <p
              id={tier.id}
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              {tier.name}
            </p>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {tier.priceMonthly}
              </span>
              <span className="text-base text-gray-500">{tier.unit}</span>
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {tier.description}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              disabled={loading}
              onClick={() => {
                handleCheckout(
                  tier.plan,
                  tier.amount,
                  tier.currency,
                  tier.credits
                );
              }}
            >
              {loading ? "处理中..." : "购买"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
