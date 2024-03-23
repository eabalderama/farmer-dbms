-- CreateTable
CREATE TABLE "farmers" (
    "farmer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_number" TEXT,
    "email" TEXT,
    "address" TEXT,
    "farm_name" TEXT,

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("farmer_id")
);
