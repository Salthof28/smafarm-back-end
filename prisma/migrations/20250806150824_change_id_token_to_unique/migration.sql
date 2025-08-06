/*
  Warnings:

  - The primary key for the `SessionLogin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SessionLogin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id_token]` on the table `SessionLogin` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id_token` on the `SessionLogin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."SessionLogin" DROP CONSTRAINT "SessionLogin_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "id_token",
ADD COLUMN     "id_token" UUID NOT NULL,
ADD CONSTRAINT "SessionLogin_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SessionLogin_id_token_key" ON "public"."SessionLogin"("id_token");
