import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtContant } from './constants/constant';
import { AuthGuard } from './features/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppConfigModule } from './features/config.module';
import { MailerServiceCustomer } from 'src/mail/mail.service';

@Module({
    imports: [
        // AppConfigModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: jwtContant.secret,
            signOptions: {expiresIn: '3600s'},
        }),
        // MailerModule.forRoot({
        //     transport: {
        //         host: process.env.MAIL_HOST,
        //         port: process.env.MAIL_PORT,
        //         secure: false,
        //         auth: {
        //             user: process.env.MAIL_USER,
        //             pass: process.env.MAIL_PASSWORD,
        //         },
        //     },
        //     defaults: {
        //         from: process.env.MAIL_FROM
        //     },
        //     template: {
        //         dir: __dirname + '/templates',
        //         adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        //         options: {
        //             strict: true,
        //         },
        //     },
        // }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, AuthGuard, MailerServiceCustomer],
    exports: [UserService],
})
export class UserModule {};