-- DropForeignKey
ALTER TABLE `translation` DROP FOREIGN KEY `Translation_languageId_fkey`;

-- DropForeignKey
ALTER TABLE `word` DROP FOREIGN KEY `Word_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `wordattempt` DROP FOREIGN KEY `WordAttempt_translationId_fkey`;

-- DropForeignKey
ALTER TABLE `wordattempt` DROP FOREIGN KEY `WordAttempt_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wordattempt` DROP FOREIGN KEY `WordAttempt_wordId_fkey`;

-- AddForeignKey
ALTER TABLE `Word` ADD CONSTRAINT `Word_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Translation` ADD CONSTRAINT `Translation_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_translationId_fkey` FOREIGN KEY (`translationId`) REFERENCES `Translation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordAttempt` ADD CONSTRAINT `WordAttempt_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
