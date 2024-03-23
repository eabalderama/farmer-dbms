/*
  Warnings:

  - Added the required column `updatedAt` to the `farmers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "farmers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "assigned_workers" (
    "assigned_worker_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "farmer_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assigned_workers_pkey" PRIMARY KEY ("assigned_worker_id")
);

-- AddForeignKey
ALTER TABLE "assigned_workers" ADD CONSTRAINT "assigned_workers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workers" ADD CONSTRAINT "assigned_workers_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmers"("farmer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
