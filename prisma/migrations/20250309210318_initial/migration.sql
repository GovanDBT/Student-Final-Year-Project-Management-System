-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` INTEGER NULL,
    `office` VARCHAR(191) NULL,
    `major` VARCHAR(191) NULL,
    `programme` VARCHAR(191) NULL,
    `role` ENUM('STUDENT', 'SUPERVISOR', 'COORDINATOR', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `studentId` INTEGER NOT NULL,
    `supervisorId` INTEGER NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `Project_id_key`(`id`),
    UNIQUE INDEX `Project_studentId_key`(`studentId`),
    UNIQUE INDEX `Project_supervisorId_key`(`supervisorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
