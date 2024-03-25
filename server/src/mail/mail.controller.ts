import { Controller, Post, Body } from '@nestjs/common';
import { MailerServiceCustomer } from './mail.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerServiceCustomer) {}

    @Post('registerConfirm')
    async sendEmail(@Body() body: { to: string; subject: string; message: string, token: string }) {
        const { to, subject, message, token } = body;
        await this.mailerService.sendMailRegister(to, token);
    }

    @Post('forgot-password')
    async sendMailForgotPass(@Body() body: {to: string}) {
        const { to } = body
        await this.mailerService.sendMailForgotPass(to)
    }
}
