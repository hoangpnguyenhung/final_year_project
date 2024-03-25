import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Role } from './user/entity/role.entity';
import { Cv } from './career/entity/cv.entity';
import { Career } from './career/entity/career.entity';
import { Car } from './car/entity/car.entity';
import { Seat } from './seat/entity/seat.entity';
import { Ticket } from './ticket/entity/ticket.entity';
import { Schedule } from './schedule/entity/schedule.entity';
import { Address } from './address/entity/address.entity';
import { Rate } from './rate/entity/rate.entity';
import { AddressModule } from './address/address.module';
import { CarModule } from './car/car.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SeatModule } from './seat/seat.module';
import { TicketModule } from './ticket/ticket.module';
import * as Joi from '@hapi/joi'
import { PaymentModule } from './payment/payment.module';
import { CareerModule } from './career/career.module';
import { RateModule } from './rate/rate.module';
import { MailerModule } from './mail/mail.module';

@Module({
  imports: [
    UserModule,
    AddressModule,
    CarModule,
    ScheduleModule,
    SeatModule,
    TicketModule,
    PaymentModule,
    CareerModule,
    RateModule,
    MailerModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost', //localhost
      port: 5432,
      username: "postgres", //postgres
      password: "postgres", //postgres
      database: "bookingticketbus", // bookingticketbus
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      logging: false,
      logger: "advanced-console",
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([
      User, Role, Cv, Career, Car, Seat, Ticket, Schedule, Address, Rate
    ])
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
