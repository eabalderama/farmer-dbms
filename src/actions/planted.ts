"use server";

import { prisma } from "@/lib/db";
import { CreatePlantedCropSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createPlanted = async (data: unknown) => {
  const result = CreatePlantedCropSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  try {
    const createPlantedData: Prisma.planted_cropsUncheckedCreateInput = {
      crop_id: payload.crop_id,
      farmer_id: payload.farmer_id,
      planting_date: payload.planting_date
        ? new Date(payload.planting_date)
        : null,
      harvest_date: payload.harvest_date
        ? new Date(payload.harvest_date)
        : null,
    };
    const planted = await prisma.planted_crops.create({
      data: createPlantedData,
    });

    revalidatePath("/planted-crops");

    return {
      success: true,
      message: "Planted crop successfully added",
      data: planted,
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

export const getPlantedCrops = async () => {
  const plantedCrops = await prisma.planted_crops.findMany({
    include: {
      farmer: true,
      crop: true,
    },
  });

  return plantedCrops;
};
