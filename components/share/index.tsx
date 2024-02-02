"use client";

import { BsShare } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

export default function ({ shareUrl }: { shareUrl: string }) {
  return (
    <CopyToClipboard
      text={`我做了一个好看的 AI 红包封面🧧，分享给你👉
      
${shareUrl}`}
      onCopy={() => toast.success("内容已复制，快去发给好友吧～")}
    >
      <a className="ml-4 bg-black cursor-pointer text-white hover:bg-black hover:text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mt-4 mx-auto">
        <BsShare className="mr-2" />
        分享给好友
      </a>
    </CopyToClipboard>
  );
}
