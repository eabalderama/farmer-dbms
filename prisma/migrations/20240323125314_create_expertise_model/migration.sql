-- CreateTable
CREATE TABLE "expertise" (
    "expertise_id" SERIAL NOT NULL,
    "expertise_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expertise_pkey" PRIMARY KEY ("expertise_id")
);

-- CreateTable
CREATE TABLE "user_expertise" (
    "user_expertise_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expertise_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_expertise_pkey" PRIMARY KEY ("user_expertise_id")
);

-- AddForeignKey
ALTER TABLE "user_expertise" ADD CONSTRAINT "user_expertise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_expertise" ADD CONSTRAINT "user_expertise_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("expertise_id") ON DELETE RESTRICT ON UPDATE CASCADE;
