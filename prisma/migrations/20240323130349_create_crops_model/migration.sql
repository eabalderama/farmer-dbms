-- CreateTable
CREATE TABLE "crops" (
    "crop_id" SERIAL NOT NULL,
    "crop_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("crop_id")
);
