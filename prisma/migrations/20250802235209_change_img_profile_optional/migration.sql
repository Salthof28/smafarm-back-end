-- AlterTable
ALTER TABLE "public"."Users" ALTER COLUMN "img_profile" DROP NOT NULL,
ALTER COLUMN "img_profile" SET DEFAULT 'no img';
