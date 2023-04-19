-- DropForeignKey
ALTER TABLE `translation` DROP FOREIGN KEY `Translation_wordId_fkey`;

-- AddForeignKey
ALTER TABLE `Translation` ADD CONSTRAINT `Translation_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
