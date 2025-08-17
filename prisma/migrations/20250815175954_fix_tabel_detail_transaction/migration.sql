/*
  Warnings:

  - Made the column `livestock_id` on table `DetailBuyTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."DetailBuyTransaction" DROP CONSTRAINT "DetailBuyTransaction_livestock_id_fkey";

-- AlterTable
ALTER TABLE "public"."DetailBuyTransaction" ALTER COLUMN "livestock_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DetailBuyTransaction" ADD CONSTRAINT "DetailBuyTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
