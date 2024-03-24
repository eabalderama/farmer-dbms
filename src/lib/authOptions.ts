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

        if (account) {
          return {
            user_id: account.account_id,
            name: account.user?.name,
            role: account.role,
            image: account.user?.picture,
          } as User;
        }

        return null;
      },
    }),
  ],
};
