"use server";

import { prisma } from "@/lib/db";
import { CreateUserSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createUser = async (data: unknown) => {
  const result = CreateUserSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  const hashed = bcrypt.hashSync(payload.password, SALT_ROUNDS);

  try {
    const account = await prisma.accounts.create({
      data: {
        email: payload.email,
        password: hashed,
        role: payload.role,
        user: {
          create: {
            name: payload.name,
            picture: payload.picture,
            contact_number: payload.contact_number,
          },
        },
      },
      include: {
        user: true,
      },
    });

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
