-- DropForeignKey
ALTER TABLE "public"."DetailBuyTransaction" DROP CONSTRAINT "DetailBuyTransaction_livestock_id_fkey";

-- AlterTable
ALTER TABLE "public"."CareTransaction" ALTER COLUMN "duration_care" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."DetailBuyTransaction" ALTER COLUMN "livestock_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DetailBuyTransaction" ADD CONSTRAINT "DetailBuyTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
