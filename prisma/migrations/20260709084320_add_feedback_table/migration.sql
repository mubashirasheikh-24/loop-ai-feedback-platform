/*
  Warnings:

  - You are about to drop the column `channel` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `customer` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentiment` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "channel",
DROP COLUMN "content",
DROP COLUMN "theme",
DROP COLUMN "userId",
ADD COLUMN     "customer" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
DROP COLUMN "sentiment",
ADD COLUMN     "sentiment" TEXT NOT NULL;
