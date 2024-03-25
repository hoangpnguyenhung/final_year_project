import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { SeatService } from '../services/seat.service';

@Controller('seat')
export class SeatController {
    constructor(private seatService: SeatService){}

    @Post(':id')
    create(@Param('id') id: any) {
        return this.seatService.create(id)
    }

    @Patch(':id')
    update(@Param('id') id: any, @Body() updateSeatDto: any) {
        return this.seatService.update(id, updateSeatDto)
    }
}