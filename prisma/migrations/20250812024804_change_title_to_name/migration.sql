/*
  Warnings:

  - You are about to drop the column `title` on the `Livestock` table. All the data in the column will be lost.
  - Added the required column `name` to the `Livestock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Livestock" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;
