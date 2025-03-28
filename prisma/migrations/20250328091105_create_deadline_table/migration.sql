-- CreateTable
CREATE TABLE `deadlines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coordinatorId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `deadlineDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `deadlines_id_key`(`id`),
    UNIQUE INDEX `deadlines_coordinatorId_key`(`coordinatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `deadlines` ADD CONSTRAINT `deadlines_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
