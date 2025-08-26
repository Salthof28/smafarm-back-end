-- DropForeignKey
ALTER TABLE "public"."CareGive" DROP CONSTRAINT "CareGive_shelter_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."CareGive" ADD CONSTRAINT "CareGive_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "public"."Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
