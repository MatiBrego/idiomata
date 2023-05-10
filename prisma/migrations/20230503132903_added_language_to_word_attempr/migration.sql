/*
  Warnings:

  - Added the required column `languageId` to the `WordAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wordattempt` ADD COLUMN `languageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
