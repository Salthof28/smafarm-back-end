/*
  Warnings:

  - You are about to drop the column `img_animal` on the `Livestock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Livestock" DROP COLUMN "img_animal";

-- CreateTable
CREATE TABLE "public"."ImgLivestocks" (
    "id" SERIAL NOT NULL,
    "livestock_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImgLivestocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ImgLivestocks" ADD CONSTRAINT "ImgLivestocks_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
