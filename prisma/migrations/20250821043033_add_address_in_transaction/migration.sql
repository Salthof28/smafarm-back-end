-- AlterTable
ALTER TABLE "public"."CareTransaction" ADD COLUMN     "address" VARCHAR(320) DEFAULT 'no used service delivery';

-- AlterTable
ALTER TABLE "public"."DetailBuyTransaction" ADD COLUMN     "address" VARCHAR(320) NOT NULL DEFAULT '';
