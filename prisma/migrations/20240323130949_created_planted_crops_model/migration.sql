-- CreateTable
CREATE TABLE "planted_crops" (
    "planted_crop_id" SERIAL NOT NULL,
    "crop_id" INTEGER NOT NULL,
    "farmer_id" INTEGER NOT NULL,
    "harvest_date" TIMESTAMP(3) NOT NULL,
    "planting_date" TIMESTAMP(3) NOT NULL,
    "area" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planted_crops_pkey" PRIMARY KEY ("planted_crop_id")
);

-- AddForeignKey
ALTER TABLE "planted_crops" ADD CONSTRAINT "planted_crops_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("crop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planted_crops" ADD CONSTRAINT "planted_crops_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmers"("farmer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
