/*
  Warnings:

  - Made the column `comment` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropIndex
DROP INDEX `comments_projectId_fkey` ON `comments`;

-- DropIndex
DROP INDEX `comments_userId_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` MODIFY `comment` LONGTEXT NOT NULL,
    MODIFY `projectId` INTEGER NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
