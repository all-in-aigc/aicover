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

import { SignOutButton } from "@clerk/nextjs";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function ({ user }: Props) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar_url} alt={user.nickname} />
          <AvatarFallback>{user.nickname}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <DropdownMenuLabel className="text-center truncate">
          {user.nickname ? user.nickname : user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="md:hidden text-center">
          额度: {user.credits?.left_credits}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuCheckboxItem className="md:hidden">
          <a href="/pricing">付费方案</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuCheckboxItem className="text-center truncate">
          <a href={`/user/${user.uuid}/covers`}>我的封面</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="text-center truncate">
          <a href="/upload">上传封面</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="text-center truncate">
          <a href={`/covers/awesome`}>精品专区</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="text-center truncate">
          <a href={`/covers/brand`}>品牌案例</a>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem>
          <SignOutButton signOutCallback={() => location.reload()}>
            退出登录
          </SignOutButton>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
