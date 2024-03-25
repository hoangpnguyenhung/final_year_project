import { Body, Controller, Get, Param, Patch, Post, Req, Request, UseGuards, Delete } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto } from '../dto/ticket.dto';
import { AuthGuard } from 'src/user/features/auth.guard';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService){}

    //Schedule ID
    @UseGuards(AuthGuard)
    @Post(':id')
    create(@Param('id') id: any, @Body() createTicketDto: CreateTicketDto, @Request() req: any) {
        return this.ticketService.create(id, createTicketDto, req.user.sub)
    }

    @Get()
    getAll() {
        return this.ticketService.getAll()
    }

    @UseGuards(AuthGuard)
    @Get('user')
    getTicketByUser(@Request() req: any) {
        const userId = req.user.sub
        return this.ticketService.getTicketByUser(userId)
    }
    
    @Get(':id')
    getOne(@Param('id') id: any) {
        return this.ticketService.getOne(id)
    }


    // Schedule ID
    @Patch('schedule/:id')
    updateStatusByDriver(@Param('id') id: number) {
        return this.ticketService.updateStatusByDriver(id)
    }

    @Get('schedule/:id')
    cancelSchedule(@Param('id') id: number) {
        return this.ticketService.cancelSchedule(id)
    }

    @Patch(':id')
    cancel(@Param('id') id: number) {
        return this.ticketService.cancelTicket(id)
    }

    @Get('statistic-by-user/:year')
    statisticByUser(@Param('year') year: number) {
        return this.ticketService.statisticByUser(year)
    }

    @Get('statistic-by-month/:year')
    statisticByMonth(@Param('year') year: number) {
        return this.ticketService.statisticByMonth(year)
    }
}