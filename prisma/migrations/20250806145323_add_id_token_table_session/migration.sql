/*
  Warnings:

  - Added the required column `id_token` to the `SessionLogin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."SessionLogin" ADD COLUMN     "id_token" TEXT NOT NULL;
