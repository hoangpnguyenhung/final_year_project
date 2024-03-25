import { Module } from '@nestjs/common';
import { SeatController } from './controllers/seat.controller';
import { SeatService } from './services/seat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entity/seat.entity';
import { Car } from 'src/car/entity/car.entity';
import { Ticket } from 'src/ticket/entity/ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Seat, Car, Ticket])
    ],
    controllers: [SeatController],
    providers: [SeatService],
})
export class SeatModule {};