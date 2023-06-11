/*
  Warnings:

  - You are about to drop the `naver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "naver";

-- CreateTable
CREATE TABLE "naverKin" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT[],
    "link" TEXT NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "naverKin_pkey" PRIMARY KEY ("uuid")
);
