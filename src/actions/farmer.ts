"use server";

import { prisma } from "@/lib/db";
import { CreateFarmerSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createFarmer = async (data: unknown) => {
  const result = CreateFarmerSchema.safeParse(data);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false, message: "Validation error", error: formatted };
  }

  const payload = result.data;

  try {
    const createFarmerData: Prisma.farmersUncheckedCreateInput = {
      name: payload.name,
      email: payload.email,
      contact_number: payload.contact_number,
      address: payload.contact_number,
      farm_name: payload.farm_name,
      assigned_workers: {
        create: payload.assigned_workers.map((assigned) => {
          return {
            user_id: assigned,
          };
        }),
      },
    };

    if (!createFarmerData.assigned_workers?.create) {
      delete createFarmerData.assigned_workers;
    }

    const farmer = await prisma.farmers.create({
      data: createFarmerData,
    });

    revalidatePath("/farmers");

    return {
      success: true,
      message: "Farmer successfully added",
      data: farmer,
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

export const getFarmers = async () => {
  const farmers = await prisma.farmers.findMany({
    include: {
      _count: {
        select: {
          assigned_workers: true,
          planted_crops: true,
        },
      },
    },
  });

  return farmers;
};
