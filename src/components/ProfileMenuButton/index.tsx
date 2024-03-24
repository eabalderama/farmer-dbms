"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Ellipsis from "../Icons/Ellipsis";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function ProfileMenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none !border-0 !ring-0">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <Link href="/#profile">My Profile</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className="hover:!ring-0 hover:!outline-none hover:!border-0 w-full justify-start hover:cursor-pointer"
            variant="ghost"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
