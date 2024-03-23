-- AlterTable
ALTER TABLE "yields" ADD COLUMN     "harvest_date" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "quantity" TEXT;
