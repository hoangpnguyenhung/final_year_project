import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { Seat } from 'src/seat/entity/seat.entity';
import { TicketService } from './services/ticket.service';
import { Schedule } from 'src/schedule/entity/schedule.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket, Seat, Schedule])
    ],
    controllers: [TicketController],
    providers: [TicketService],
})
export class TicketModule {};