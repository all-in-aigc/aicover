"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Cookie from "js-cookie";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function ({ user }: Props) {
  const router = useRouter();

  const logout = () => {
    Cookie.remove("user-token");
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar_url} alt={user.nickname} />
          <AvatarFallback>{user.nickname || "🧧"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <DropdownMenuCheckboxItem className="text-center truncate">
          {user.nickname ? user.nickname : "匿名用户"}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="text-center truncate">
          <a href={`/user/${user.uuid}/covers`}>我的封面</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="md:hidden text-center">
          额度: {user.credits?.left_credits}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuCheckboxItem className="md:hidden">
          <a href="/pricing">价格</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuCheckboxItem>
          <button onClick={logout}>退出登录</button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
