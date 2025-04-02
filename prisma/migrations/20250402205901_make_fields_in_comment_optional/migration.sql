-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropIndex
DROP INDEX `comments_projectId_fkey` ON `comments`;

-- DropIndex
DROP INDEX `comments_userId_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` MODIFY `projectId` INTEGER NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
