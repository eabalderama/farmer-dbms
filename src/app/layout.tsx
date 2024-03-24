import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Profile from "@/components/Profile";
import ProfileMenuButton from "@/components/ProfileMenuButton";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Farmers DBMS",
  description: "Farmers database management system for extension workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
