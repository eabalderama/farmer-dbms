"use client";

import ProfileMenuButton from "../ProfileMenuButton";
import ProfileAvatar from "./ProfileAvatar";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  const user =
    session.status === "authenticated" ? session.data.user : undefined;

  return (
    <div className="px-4 py-2 flex gap-3">
      <ProfileAvatar initials={"JD"} />
      <div className="flex-1 flex flex-col justify-center">
        <p className="font-bold">{user?.name}</p>
        {user && (
          <p className="text-sm">
            {user.role === "ADMIN" ? "Admin" : "Extension Worker"}
          </p>
        )}
      </div>
      <ProfileMenuButton />
    </div>
  );
}
