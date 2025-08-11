/*
  Warnings:

  - Added the required column `location` to the `Livestock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Livestock" ADD COLUMN     "location" VARCHAR(320) NOT NULL;
