import { validateCredentials } from "@/actions/auth";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const account = await validateCredentials(
          credentials.email,
          credentials.password
        );

        if (account && account.user) {
          return {
            user_id: account.user.user_id,
            name: account.user?.name,
            role: account.role,
            picture: account.user?.picture,
          } as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
};
