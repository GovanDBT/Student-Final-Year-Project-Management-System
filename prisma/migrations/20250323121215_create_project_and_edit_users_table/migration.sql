/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `office` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `programme` ENUM('BSC_COMPUTER_SCIENCE', 'BSC_INFORMATION_TECHNOLOGY', 'BSC_COMPUTING_WITH_FINANCE', 'BSC_COMPUTER_INFORMATION_SYSTEMS') NULL,
    ADD COLUMN `role` ENUM('STUDENT', 'SUPERVISOR', 'COORDINATOR', 'ADMIN') NULL DEFAULT 'STUDENT',
    ADD COLUMN `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `studentId` INTEGER NOT NULL,
    `supervisorId` INTEGER NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateUpdated` DATETIME(3) NULL,

    UNIQUE INDEX `Project_id_key`(`id`),
    UNIQUE INDEX `Project_studentId_key`(`studentId`),
    UNIQUE INDEX `Project_supervisorId_key`(`supervisorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_userId_key` ON `users`(`userId`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
