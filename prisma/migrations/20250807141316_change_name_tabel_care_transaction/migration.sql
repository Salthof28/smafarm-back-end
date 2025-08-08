/*
  Warnings:

  - You are about to drop the `DetailCareTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DetailCareTransaction" DROP CONSTRAINT "DetailCareTransaction_livestock_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DetailCareTransaction" DROP CONSTRAINT "DetailCareTransaction_transaction_id_fkey";

-- DropTable
DROP TABLE "public"."DetailCareTransaction";

-- CreateTable
CREATE TABLE "public"."CareTransaction" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "livestock_id" INTEGER NOT NULL,
    "shelter_id" INTEGER NOT NULL,
    "duration_care" INTEGER NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "finish_date" TIMESTAMPTZ(6) NOT NULL,
    "one_day_price" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "sub_total" DECIMAL(15,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "CareTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CareTransaction" ADD CONSTRAINT "CareTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareTransaction" ADD CONSTRAINT "CareTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
