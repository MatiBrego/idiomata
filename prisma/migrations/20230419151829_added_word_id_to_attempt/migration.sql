/*
  Warnings:

  - Added the required column `wordId` to the `WordAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `wordattempt` DROP FOREIGN KEY `WordAttempt_translationId_fkey`;

-- AlterTable
ALTER TABLE `wordattempt` ADD COLUMN `wordId` INTEGER NOT NULL,
    MODIFY `translationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `Translation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
