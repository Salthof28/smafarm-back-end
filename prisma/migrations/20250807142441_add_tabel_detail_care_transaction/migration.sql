-- CreateTable
CREATE TABLE "public"."DetailCareTransaction" (
    "id" SERIAL NOT NULL,
    "careTransaction_id" INTEGER NOT NULL,
    "careGive_id" INTEGER NOT NULL,

    CONSTRAINT "DetailCareTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_careTransaction_id_fkey" FOREIGN KEY ("careTransaction_id") REFERENCES "public"."CareTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_careGive_id_fkey" FOREIGN KEY ("careGive_id") REFERENCES "public"."CareGive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
