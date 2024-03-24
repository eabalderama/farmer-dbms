"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface LinkButtonProps {
  path: string;
  label: string;
}

export default function LinkButton({ path, label }: LinkButtonProps) {
  const pathname = usePathname();
  return (
    <Button
      variant="ghost"
      className={`text-lg hover:bg-secondary rounded-none !justify-start text-emerald-800 ${
        pathname === path ? "bg-secondary" : ""
      }`}
      asChild
    >
      <Link href={path}>{label}</Link>
    </Button>
  );
}
