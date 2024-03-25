"use server";

import { prisma } from "@/lib/db";
import { CreateExpertiseSchema } from "@/lib/schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createExpertise = async (data: unknown) => {
  const result = CreateExpertiseSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  try {
    const expertise = await prisma.expertise.create({
      data: {
        expertise_name: payload.name,
      },
    });

    revalidatePath("/expertise");

    return {
      success: true,
      message: "Expertise successfully created",
      data: expertise,
    };
  } catch (error) {
    console.error(error);
    let message = "An error occured while creating expertise";
    if (error instanceof PrismaClientKnownRequestError) {
      message = error.message;
    }
    return {
      success: false,
      message,
      error,
    };
  }
};

export const getExpertise = async () => {
  const expertise = await prisma.expertise.findMany({
    include: {
      _count: {
        select: {
          user_expertise: true,
        },
      },
    },
  });

  return expertise;
};
