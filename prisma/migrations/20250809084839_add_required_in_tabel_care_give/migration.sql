/*
  Warnings:

  - You are about to drop the column `imgFarm` on the `Farms` table. All the data in the column will be lost.
  - You are about to drop the column `price_day` on the `Shelter` table. All the data in the column will be lost.
  - Added the required column `required` to the `CareGive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_farm` to the `Farms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CareGive" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "public"."Farms" DROP COLUMN "imgFarm",
ADD COLUMN     "img_farm" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Shelter" DROP COLUMN "price_day",
ADD COLUMN     "price_daily" DECIMAL(15,2) NOT NULL DEFAULT 0.00;
