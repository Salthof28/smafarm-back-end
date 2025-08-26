-- DropForeignKey
ALTER TABLE "public"."ImgLivestocks" DROP CONSTRAINT "ImgLivestocks_livestock_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ImgShelter" DROP CONSTRAINT "ImgShelter_shelter_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."ImgLivestocks" ADD CONSTRAINT "ImgLivestocks_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImgShelter" ADD CONSTRAINT "ImgShelter_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "public"."Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
