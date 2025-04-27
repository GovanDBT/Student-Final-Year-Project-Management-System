-- AlterTable
ALTER TABLE `submissions` ADD COLUMN `dateUpdated` DATETIME(3) NULL,
    MODIFY `description` VARCHAR(191) NULL;
