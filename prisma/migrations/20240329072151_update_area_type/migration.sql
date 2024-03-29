/*
  Warnings:

  - The `area` column on the `planted_crops` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "planted_crops" DROP COLUMN "area",
ADD COLUMN     "area" INTEGER;
