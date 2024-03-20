/*
  Warnings:

  - Added the required column `internshipID` to the `internshipAgreements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionID` to the `internships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `internshipAgreements` ADD COLUMN `internshipID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `internships` ADD COLUMN `sectionID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `internships` ADD CONSTRAINT `internships_sectionID_fkey` FOREIGN KEY (`sectionID`) REFERENCES `sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `internshipAgreements` ADD CONSTRAINT `internshipAgreements_internshipID_fkey` FOREIGN KEY (`internshipID`) REFERENCES `internships`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
