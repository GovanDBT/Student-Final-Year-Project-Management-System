-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `announcements` DROP FOREIGN KEY `announcements_coordinatorId_fkey`;

-- DropForeignKey
ALTER TABLE `deadlines` DROP FOREIGN KEY `deadlines_coordinatorId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `feedbacks_submissionId_fkey`;

-- DropForeignKey
ALTER TABLE `feedbacks` DROP FOREIGN KEY `feedbacks_supervisorId_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_supervisorId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `submissions` DROP FOREIGN KEY `submissions_projectId_fkey`;

-- DropIndex
DROP INDEX `accounts_user_id_fkey` ON `accounts`;

-- DropIndex
DROP INDEX `announcements_coordinatorId_key` ON `announcements`;

-- DropIndex
DROP INDEX `deadlines_coordinatorId_key` ON `deadlines`;

-- DropIndex
DROP INDEX `feedbacks_submissionId_key` ON `feedbacks`;

-- DropIndex
DROP INDEX `feedbacks_supervisorId_key` ON `feedbacks`;

-- DropIndex
DROP INDEX `projects_supervisorId_key` ON `projects`;

-- DropIndex
DROP INDEX `sessions_user_id_fkey` ON `sessions`;

-- DropIndex
DROP INDEX `submissions_projectId_key` ON `submissions`;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `submissions_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `submissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
