-- AlterTable
ALTER TABLE "public"."Livestock" ALTER COLUMN "img_animal" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."Shelter" ALTER COLUMN "img_shelter" SET DEFAULT ARRAY[]::TEXT[];
