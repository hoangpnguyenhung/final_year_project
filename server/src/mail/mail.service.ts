import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerServiceCustomer {
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'phandinhminh16082001@gmail.com',
                pass: 'auctogalbgrhwisw',
            },
        });
    }

    async sendMailRegister(to: string, token: string) {
        await this.transporter.sendMail({
            from: 'phandinhminh16082001@gmail.com',
            to: to,
            subject: "Xác nhận đăng ký tài khoản",
            html: `
                <h1>MIKA xin chào ${to},</h1>
                <p>Cảm ơn bạn đã đăng ký tài khoản trên trang web của chúng tôi. Vui lòng nhấp vào nút bên dưới để xác nhận đăng ký tài khoản của bạn:</p>
                <a href="http://localhost:3000/confirm/${token}" target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none;">Xác nhận đăng ký tài khoản</a>            
            `,
        });
    }

    async sendMailForgotPass(to: string) {
        await this.transporter.sendMail({
            from: 'phandinhminh16082001@gmail.com',
            to: to,
            subject: "Khôi phục thông tin tài khoản",
            html: `
                <h1>MIKA xin chào ${to},</h1>
                <p>Để thay đổi mật khẩu của bạn. Vui lòng nhấp vào nút bên dưới để chuyển đến trang thay đổi mật khẩu:</p>
                <a href="http://localhost:3000/forgot-password" target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none;">Thay đổi mật khẩu</a>            
            `,
        });
    }
}