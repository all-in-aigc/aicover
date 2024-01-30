"use client";

import { BsTwitterX } from "react-icons/bs";
import { TwitterShareButton } from "react-share";

export default function ({ shareUrl }: { shareUrl: string }) {
  return (
    <TwitterShareButton
      url={shareUrl}
      title={"我做了一个好看的 AI 红包封面🧧，分享给你👉"}
      className="ml-4"
    >
      <a className="bg-black text-white hover:bg-black hover:text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mt-4 mx-auto">
        <BsTwitterX className="mr-2" />
        分享到 Twitter
      </a>
    </TwitterShareButton>
  );
}
