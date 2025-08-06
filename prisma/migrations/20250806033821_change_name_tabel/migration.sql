/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropTable
DROP TABLE "public"."Session";

-- CreateTable
CREATE TABLE "public"."SessionLogin" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userAgent" TEXT DEFAULT 'unknown',
    "ipAddress" TEXT DEFAULT 'unknown',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionLogin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SessionLogin" ADD CONSTRAINT "SessionLogin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
