import { Cover } from "@/types/cover";
import Covers from "@/components/covers";
import Userinfo from "@/components/userinfo";
import { findUserByUuid } from "@/models/user";
import { getUserCovers } from "@/models/cover";

export default async function ({ params }: { params: { uuid: string } }) {
  const user = await findUserByUuid(params.uuid);
  let covers: Cover[] = [];
  if (user && user.email) {
    covers = await getUserCovers(user.email, 1, 60);
  }

  return (
    <div className="w-full px-6">
      <div className="mx-auto max-w-7xl px-5 my-16 flex flex-col items-center justify-center">
        {user && <Userinfo user={user} />}
        <div className="mt-2">
          <span className="text-primary text-md">{covers.length}</span> 个作品
        </div>
      </div>

      <Covers cate="mine" covers={covers} showTab={false} />
    </div>
  );
}
