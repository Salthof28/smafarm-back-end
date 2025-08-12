-- AddForeignKey
ALTER TABLE "public"."Shelter" ADD CONSTRAINT "Shelter_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
