/*
  Warnings:

  - Added the required column `projectId` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Made the column `deadlineId` on table `submissions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_deadlineId_fkey`;

-- DropIndex
DROP INDEX `submissions_deadlineId_fkey` ON `submissions`;

-- AlterTable
ALTER TABLE `submissions` ADD COLUMN `projectId` INTEGER NOT NULL,
    MODIFY `deadlineId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_deadlineId_fkey` FOREIGN KEY (`deadlineId`) REFERENCES `deadlines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
