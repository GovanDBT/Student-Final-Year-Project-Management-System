/*
  Warnings:

  - You are about to drop the column `major` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `programme` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `major`,
    MODIFY `programme` ENUM('BSC_COMPUTER_SCIENCE', 'BSC_INFORMATION_TECHNOLOGY', 'BSC_COMPUTING_WITH_FINANCE', 'BIS_COMPUTER_INFORMATION_SYSTEMS') NULL;
