"use client";

import Link from "next/link";
import Profile from "../Profile";
import ProfileMenuButton from "../ProfileMenuButton";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

const links = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/farmers",
    label: "Farmers",
  },
  {
    path: "/planted-crops",
    label: "Planted Crops",
  },
  {
    path: "/crops",
    label: "Crops",
  },
  {
    path: "/input-types",
    label: "Input Types",
  },
];

const adminLinks = [
  {
    path: "/extension-workers",
    label: "Extension Workers",
  },
  {
    path: "/expertise",
    label: "Expertise",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  return (
    <nav className="w-[300px] bg-background py-5 border-r flex flex-col">
      <h2 className="text-center text-3xl font-bold my-3 text-emerald-800">
        FDBMS
      </h2>
      <div className="flex flex-col gap-2 mt-5">
        {links.map((link) => {
          return (
            <Button
              key={link.path}
              variant="ghost"
              className={`text-lg hover:bg-secondary rounded-none !justify-start text-emerald-800 ${
                pathname === link.path ? "bg-secondary" : ""
              }`}
              asChild
            >
              <Link href={link.path}>{link.label}</Link>
            </Button>
          );
        })}
        <Separator className="my-4" />
        {adminLinks.map((link) => {
          return (
            <Button
              key={link.path}
              variant="ghost"
              className={`text-lg hover:bg-secondary rounded-none !justify-start text-emerald-800 ${
                pathname === link.path ? "bg-secondary" : ""
              }`}
              asChild
            >
              <Link href={link.path}>{link.label}</Link>
            </Button>
          );
        })}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="px-4 py-2 flex gap-3">
          <Profile initials="JD" />
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-bold">John Doe</p>
            <p className="text-sm">Extension Worker</p>
          </div>
          <ProfileMenuButton />
        </div>
      </div>
    </nav>
  );
}
