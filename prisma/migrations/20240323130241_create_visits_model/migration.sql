-- CreateTable
CREATE TABLE "visits" (
    "visit_id" SERIAL NOT NULL,
    "farmer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("visit_id")
);

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmers"("farmer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
