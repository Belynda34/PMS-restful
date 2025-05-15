/*
  Warnings:

  - You are about to drop the column `date` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `date`,
    DROP COLUMN `duration`,
    DROP COLUMN `startTime`,
    ADD COLUMN `spotId` VARCHAR(191) NULL;
