-- AddForeignKey
ALTER TABLE "public"."Livestock" ADD CONSTRAINT "Livestock_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."Farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
