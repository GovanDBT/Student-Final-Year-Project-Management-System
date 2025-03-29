-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_supervisorId_fkey`;

-- DropIndex
DROP INDEX `projects_supervisorId_fkey` ON `projects`;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
