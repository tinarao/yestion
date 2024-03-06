"use client";

import { SignOutButton, useUser } from "@clerk/clerk-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-4 cursor-pointer bg-backgroud hover:bg-primary-foreground/80 justify-start px-4 py-2 text-sm">
          <Avatar>
            <AvatarImage
              src={user?.imageUrl}
              alt={`${user?.username} avatar`}
            />
            <AvatarFallback>
              {user?.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium line-clamp-1">{user?.username}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex items-center gap-x-2">
          <div className="rounded-md bg-secondary p-1 flex gap-x-4 w-full pt-2">
            <Avatar>
              <AvatarImage
                src={user?.imageUrl}
                alt={`${user?.username} avatar`}
              />
              <AvatarFallback>
                {user?.username?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold leading-none">
                {user?.username}
              </p>
              <p className="text-xs line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
          <SignOutButton>Выйти</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
