import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/features/auth.guard';
import { RateService } from '../services/rate.service';

@Controller('rate')
export class RateController {
    constructor(private reteService: RateService){}

    @UseGuards(AuthGuard)
    @Post(':id')
    create(@Request() req: any, @Param('id') id: any, @Body() createRateDto: any) {
        return this.reteService.create(id, req.user.sub, createRateDto)
    }

    //ticketId
    @Get('ticket/:id')
    getOneByTicket(@Param('id') id: any) {
        return this.reteService.getOne(id)
    }

    //scheduleId
    @Get(':id')
    getAll(@Param('id') id: any) {
        return this.reteService.getAll(id)
    }

}