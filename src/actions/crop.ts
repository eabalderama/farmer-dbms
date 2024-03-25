"use server";

import { prisma } from "@/lib/db";
import { CreateCropSchema } from "@/lib/schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createCrop = async (data: unknown) => {
  const result = CreateCropSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  try {
    const crop = await prisma.crops.create({
      data: payload,
    });

    revalidatePath("/crops");

    return {
      success: true,
      message: "Crop successfully created",
      data: crop,
    };
  } catch (error) {
    console.error(error);
    let message = "An error occured while creating crop";
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

export const getCrop = async () => {
  const crops = await prisma.crops.findMany({
    include: {
      _count: {
        select: {
          planted_crops: true,
        },
      },
    },
  });

  return crops;
};
