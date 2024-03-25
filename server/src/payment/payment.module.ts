import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/entity/ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket])
    ],
    controllers: [PaymentController],
    providers: [],
})
export class PaymentModule {};