"use server";

import { prisma } from "@/lib/db";
import { CreateInputTypeSchema } from "@/lib/schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createInputType = async (data: unknown) => {
  const result = CreateInputTypeSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  try {
    const inputType = await prisma.input_types.create({
      data: payload,
    });

    revalidatePath("/input-types");

    return {
      success: true,
      message: "Input type successfully created",
      data: inputType,
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

export const getInputType = async () => {
  const inputTypes = await prisma.input_types.findMany({
    include: {
      _count: {
        select: {
          crop_inputs: true,
        },
      },
    },
  });

  return inputTypes;
};
