import { Module } from '@nestjs/common';
import { MailerController } from './mail.controller';
import { MailerServiceCustomer } from './mail.service';

@Module({
    controllers: [MailerController],
    providers: [MailerServiceCustomer],
})
export class MailerModule {};