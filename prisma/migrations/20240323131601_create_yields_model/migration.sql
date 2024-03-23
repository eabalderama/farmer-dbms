-- AlterTable
ALTER TABLE "planted_crops" ALTER COLUMN "harvest_date" DROP NOT NULL,
ALTER COLUMN "planting_date" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL;

-- CreateTable
CREATE TABLE "yields" (
    "yield_id" SERIAL NOT NULL,
    "planted_crop_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "yields_pkey" PRIMARY KEY ("yield_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "yields_planted_crop_id_key" ON "yields"("planted_crop_id");

-- AddForeignKey
ALTER TABLE "yields" ADD CONSTRAINT "yields_planted_crop_id_fkey" FOREIGN KEY ("planted_crop_id") REFERENCES "planted_crops"("planted_crop_id") ON DELETE RESTRICT ON UPDATE CASCADE;
