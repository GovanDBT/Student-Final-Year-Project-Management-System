/*
  Warnings:

  - You are about to drop the column `title` on the `submissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `submissions` DROP COLUMN `title`,
    ADD COLUMN `deadlineId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_deadlineId_fkey` FOREIGN KEY (`deadlineId`) REFERENCES `deadlines`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
