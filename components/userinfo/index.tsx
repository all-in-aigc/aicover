import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@/types/user";

export default function ({ user }: { user: User }) {
  return (
    <div>
      {user && (
        <div className="flex flex-col items-center justify-center">
          <Avatar className="cursor-pointer w-20 h-20">
            <AvatarImage src={user.avatar_url} alt={user.nickname} />
            <AvatarFallback>{user.nickname || "🧧"}</AvatarFallback>
          </Avatar>
          <p className="mt-4 text-lg">
            {user.nickname ? user.nickname : "匿名用户"}
          </p>
        </div>
      )}
    </div>
  );
}
