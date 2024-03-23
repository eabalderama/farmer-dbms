-- CreateTable
CREATE TABLE "crop_inputs" (
    "crop_input_id" SERIAL NOT NULL,
    "planted_crop_id" INTEGER NOT NULL,
    "input_type_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cost" TEXT,
    "quantity" TEXT,
    "application_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crop_inputs_pkey" PRIMARY KEY ("crop_input_id")
);

-- AddForeignKey
ALTER TABLE "crop_inputs" ADD CONSTRAINT "crop_inputs_planted_crop_id_fkey" FOREIGN KEY ("planted_crop_id") REFERENCES "planted_crops"("planted_crop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_inputs" ADD CONSTRAINT "crop_inputs_input_type_id_fkey" FOREIGN KEY ("input_type_id") REFERENCES "input_types"("input_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
