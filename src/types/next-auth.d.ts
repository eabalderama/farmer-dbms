import { roles } from "@prisma/client";
import NextAuth, { DefaultSession, User, Profile } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number;
      name: string;
      picture?: string;
      role: roles;
    } & DefaultSession["user"];
  }

  interface User extends User {
    user_id: number;
    name: string;
    picture?: string;
    role: roles;
  }
}
