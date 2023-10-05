/*
  Warnings:

  - Added the required column `category_id` to the `Symptom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Symptom` ADD COLUMN `category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Symptom` ADD CONSTRAINT `Symptom_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
