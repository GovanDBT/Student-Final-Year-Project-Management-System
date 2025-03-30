/*
  Warnings:

  - Made the column `studentId` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_studentId_fkey`;

-- AlterTable
ALTER TABLE `projects` MODIFY `studentId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
