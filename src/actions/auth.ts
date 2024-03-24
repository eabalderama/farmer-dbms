"use server";

import { prisma } from "@/lib/db";
import { CredentialSchema } from "@/lib/schema";
import bcrypt from "bcrypt";

export const validateCredentials = async (email: string, password: string) => {
  const result = CredentialSchema.safeParse({ email, password });
  if (!result.success) {
    return null;
  }

  const credentials = result.data;

  const account = await prisma.accounts.findFirst({
    where: {
      email: credentials.email,
    },
    include: {
      user: true,
    },
  });

  if (!account) {
    return null;
  }

  const isValidPassword = bcrypt.compareSync(
    credentials.password,
    account.password
  );

  if (!isValidPassword) {
    return null;
  }

  return account;
};
