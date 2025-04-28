/*
  Warnings:

  - You are about to drop the column `comment` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `description` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feedbacks` DROP COLUMN `comment`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
