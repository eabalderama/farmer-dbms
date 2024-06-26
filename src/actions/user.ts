"use server";

import { prisma } from "@/lib/db";
import { CreateUserSchema } from "@/lib/schema";
import { Prisma, roles } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const SALT_ROUNDS = 10;

export const createUser = async (data: unknown) => {
  const result = CreateUserSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  const hashed = bcrypt.hashSync(payload.password, SALT_ROUNDS);

  const createAccountData: Prisma.accountsUncheckedCreateInput = {
    email: payload.email,
    password: hashed,
    role: payload.role,
    user: {
      create: {
        name: payload.name,
        picture: payload.picture,
        contact_number: payload.contact_number,
        user_expertise: {
          create: payload.expertise.map((item) => ({ expertise_id: item })),
        },
      },
    },
  };

  try {
    const account = await prisma.accounts.create({
      data: createAccountData,
      include: {
        user: true,
      },
    });

    revalidatePath("/extension-workers");
    return {
      success: true,
      message: "User created successfully",
      data: account,
    };
  } catch (error) {
    console.error(error);
    let message = "An error occured while creating user";
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") message = "Email is already in use!";
    }
    return {
      success: false,
      message: message,
      error: error,
    };
  }
};

export const getWorkers = async () => {
  const users = await prisma.users.findMany({
    where: {
      account: {
        role: roles.WORKER,
      },
    },
    include: {
      account: true,
      assigned_farmers: true,
      _count: {
        select: {
          assigned_farmers: true,
        },
      },
    },
  });

  return users;
};
