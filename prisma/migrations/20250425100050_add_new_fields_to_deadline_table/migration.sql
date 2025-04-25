/*
  Warnings:

  - Added the required column `dateUpdated` to the `deadlines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deadlines` ADD COLUMN `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateUpdated` DATETIME(3) NOT NULL,
    ADD COLUMN `isSubmittable` BOOLEAN NOT NULL DEFAULT false;
