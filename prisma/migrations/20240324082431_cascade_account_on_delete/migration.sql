-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_account_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;
