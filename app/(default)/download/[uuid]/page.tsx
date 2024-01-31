import { currentUser } from "@clerk/nextjs";
import { findCoverByUuid } from "@/models/cover";
import { getUserCredits } from "@/services/order";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: { uuid: string } }) {
  const cover = await findCoverByUuid(params.uuid);
  if (!cover || !cover) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">参数错误</p>
    );
  }

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">请先登录</p>
    );
  }

  const user_email = user.emailAddresses[0].emailAddress;
  const credits = await getUserCredits(user_email);
  if (!credits || credits.left_credits < 1) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">
        额度不足，请先充值
      </p>
    );
  }

  // const img_url = cover.img_url;

  const img_url = `${
    process.env.WEB_BASE_URI
  }/_next/image?url=${encodeURIComponent(cover.img_url)}&w=400&q=75`;

  redirect(img_url);
}
