-- AddForeignKey
ALTER TABLE "public"."CareTransaction" ADD CONSTRAINT "CareTransaction_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "public"."Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
