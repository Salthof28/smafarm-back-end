-- CreateEnum
CREATE TYPE "public"."RoleUser" AS ENUM ('ADMIN', 'BREEDER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "public"."StatusUser" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "public"."StatusTransaction" AS ENUM ('WAITING', 'SENDING', 'CARE', 'FINISH');

-- CreateEnum
CREATE TYPE "public"."UnitCare" AS ENUM ('DAY', 'WEEK');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "status" "public"."StatusUser" NOT NULL,
    "img_profile" TEXT NOT NULL,
    "role" "public"."RoleUser" NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "img_category" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farms" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(320) NOT NULL,
    "imgFarm" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Livestock" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "price" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "stock" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "img_animal" TEXT[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Livestock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Shelter" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(320) NOT NULL,
    "img_shelter" TEXT[],
    "accomodate" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price_day" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CareGive" (
    "id" SERIAL NOT NULL,
    "shelter_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "unit" "public"."UnitCare" NOT NULL,

    CONSTRAINT "CareGive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "date_transaction" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "total_amount" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "status_transaction" "public"."StatusTransaction" NOT NULL,
    "rating" INTEGER,
    "review" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DetailBuyTransaction" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "livestock_id" INTEGER NOT NULL,
    "total_livestock" INTEGER NOT NULL,
    "unit_price" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "sub_total" DECIMAL(15,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "DetailBuyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DetailCareTransaction" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "livestock_id" INTEGER NOT NULL,
    "shelter_id" INTEGER NOT NULL,
    "duration_care" INTEGER NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "finish_date" TIMESTAMPTZ(6) NOT NULL,
    "one_day_price" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "sub_total" DECIMAL(15,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "DetailCareTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "public"."Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Farms_user_id_key" ON "public"."Farms"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Farms" ADD CONSTRAINT "Farms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Livestock" ADD CONSTRAINT "Livestock_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shelter" ADD CONSTRAINT "Shelter_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."Farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareGive" ADD CONSTRAINT "CareGive_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "public"."Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."Farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailBuyTransaction" ADD CONSTRAINT "DetailBuyTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailBuyTransaction" ADD CONSTRAINT "DetailBuyTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailCareTransaction" ADD CONSTRAINT "DetailCareTransaction_livestock_id_fkey" FOREIGN KEY ("livestock_id") REFERENCES "public"."Livestock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
