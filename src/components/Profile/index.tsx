import { roles } from "@prisma/client";
import ProfileMenuButton from "../ProfileMenuButton";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileProps {
  name: string;
  role: roles;
  image?: string;
}

export default function Profile(props: ProfileProps) {
  return (
    <div className="px-4 py-2 flex gap-3">
      <ProfileAvatar initials={props.name.charAt(0)} />
      <div className="flex-1 flex flex-col justify-center">
        <p className="font-bold">{props?.name}</p>
        {props && (
          <p className="text-sm">
            {props.role === "ADMIN" ? "Admin" : "Extension Worker"}
          </p>
        )}
      </div>
      <ProfileMenuButton />
    </div>
  );
}
