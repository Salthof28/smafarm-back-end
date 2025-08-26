-- AlterEnum
ALTER TYPE "public"."StatusTransaction" ADD VALUE 'DECLINE';

-- DropForeignKey
ALTER TABLE "public"."CareTransaction" DROP CONSTRAINT "CareTransaction_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetailBuyTransaction" DROP CONSTRAINT "DetailBuyTransaction_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetailCareTransaction" DROP CONSTRAINT "DetailCareTransaction_careGive_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetailCareTransaction" DROP CONSTRAINT "DetailCareTransaction_careTransaction_id_fkey";

-- AlterTable
ALTER TABLE "public"."DetailCareTransaction" ALTER COLUMN "careGive_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DetailBuyTransaction" ADD CONSTRAINT "DetailBuyTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareTransaction" ADD CONSTRAINT "CareTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_careTransaction_id_fkey" FOREIGN KEY ("careTransaction_id") REFERENCES "public"."CareTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_careGive_id_fkey" FOREIGN KEY ("careGive_id") REFERENCES "public"."CareGive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
