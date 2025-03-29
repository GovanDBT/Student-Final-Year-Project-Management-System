-- AddForeignKey
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deadlines` ADD CONSTRAINT `deadlines_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
