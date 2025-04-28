/*
  Warnings:

  - You are about to drop the column `projectId` on the `submissions` table. All the data in the column will be lost.
  - Added the required column `userId` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_projectId_fkey`;

-- DropIndex
DROP INDEX `submissions_projectId_fkey` ON `submissions`;

-- AlterTable
ALTER TABLE `submissions` DROP COLUMN `projectId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
