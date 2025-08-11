/*
  Warnings:

  - You are about to drop the column `img_shelter` on the `Shelter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Shelter" DROP COLUMN "img_shelter";

-- CreateTable
CREATE TABLE "public"."ImgShelter" (
    "id" SERIAL NOT NULL,
    "shelter_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImgShelter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ImgShelter" ADD CONSTRAINT "ImgShelter_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "public"."Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
