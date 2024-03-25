import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { User } from "../entity/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateUserDto } from "../dto/user.dto";
import { MailerServiceCustomer } from "src/mail/mail.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailerService: MailerServiceCustomer,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if(user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const userRole = await this.userService.findOne(user.id)
        const comparePass = bcrypt.compareSync(pass, user.password)

        // if(user?.password !== pass) {
        //     throw new UnauthorizedException();
        // }

        if(!comparePass || user.isActive === false) {
            throw new UnauthorizedException();
        }

        const payload = {username: user.username, sub: user.id}

        return {
            access_token: await this.jwtService.signAsync(payload),
            role: userRole.role.code,
            name: userRole.name,
            id: userRole?.id
        }
    }


    // Sign Up Confirm
    // async register(userDto: CreateUserDto): Promise<void> {
    //     const user = await this.userService.create(userDto);
    //     const payload = {username: user.username, sub: user.id}
    //     const token = await this.jwtService.signAsync(payload);
    //     await this.mailerService.sendMailRegister(user.email, token);
    // }

    // async confirmEmail(token: string): Promise<void> {
    //     try {
    //       const payload = await this.jwtService.verifyAsync(token);
    //       const user = await this.userService.findById(payload.sub);
    //       if (!user) {
    //         throw new BadRequestException('User not found');
    //       }
    //       user.isActive = true;
    //       await user.save();
    //     } catch (error) {
    //       throw new BadRequestException('Invalid token');
    //     }
    // }

    // private async generateEmailToken(user: User): Promise<string> {
    //     const payload = { sub: user.id };
    //     return this.jwtService.signAsync(payload, {
    //       expiresIn: '1d',
    //     });
    // }

    // private async sendConfirmationEmail(email: string, token: string): Promise<void> {
    //     const confirmationUrl = `http://localhost:3000/auth/confirm?token=${token}`;
    //     await this.mailerService.sendMail({
    //       to: email,
    //       subject: 'Xác nhận tài khoản',
    //       template: 'confirmation',
    //       context: {
    //         confirmationUrl,
    //       },
    //     });
    // }
}