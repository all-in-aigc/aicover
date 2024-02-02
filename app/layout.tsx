import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s by AI 红包封面生成器 ｜ AI Cover",
    default: "AI 红包封面生成器 ｜ AI Cover",
  },
  description:
    "AI 红包封面生成器，利用 AI 技术生成高清精美的微信红包封面图片。",
  keywords: "AI 红包封面生成器, 微信红包封面, 微信红包, AI 红包封面, AI Cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" richColors />
        {children}
        <Analytics />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
          var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?050ba8ed390471309badf55af87f7662";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
          `,
          }}
        ></script> */}
      </body>
    </html>
  );
}
