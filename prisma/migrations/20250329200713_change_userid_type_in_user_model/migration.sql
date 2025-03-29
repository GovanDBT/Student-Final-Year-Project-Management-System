-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_supervisorId_fkey`;

-- DropIndex
DROP INDEX `projects_supervisorId_fkey` ON `projects`;

-- AlterTable
ALTER TABLE `projects` MODIFY `studentId` VARCHAR(191) NULL,
    MODIFY `supervisorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
