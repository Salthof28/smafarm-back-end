/*
  Warnings:

  - Added the required column `total_livestock` to the `CareTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CareTransaction" DROP CONSTRAINT "CareTransaction_livestock_id_fkey";

-- AlterTable
ALTER TABLE "public"."CareTransaction" ADD COLUMN     "total_livestock" INTEGER NOT NULL,
ALTER COLUMN "livestock_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CareTransaction" ADD CONSTRAINT "CareTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
