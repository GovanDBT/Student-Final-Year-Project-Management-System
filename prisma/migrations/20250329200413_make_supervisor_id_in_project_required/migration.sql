/*
  Warnings:

  - Made the column `supervisorId` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_supervisorId_fkey`;

-- DropIndex
DROP INDEX `projects_supervisorId_fkey` ON `projects`;

-- AlterTable
ALTER TABLE `projects` MODIFY `supervisorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
