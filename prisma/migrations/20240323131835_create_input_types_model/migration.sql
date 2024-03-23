-- CreateTable
CREATE TABLE "input_types" (
    "input_type_id" SERIAL NOT NULL,
    "input_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "input_types_pkey" PRIMARY KEY ("input_type_id")
);
