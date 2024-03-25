import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import { CreateCheduleDto } from '../dto/schedule.dto';

@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService){}

    @Post()
    create(@Body() createCheduleDto: CreateCheduleDto){
        return this.scheduleService.create(createCheduleDto)
    }

    // Schedule ID
    // @Post(':id')
    // addCarOfSchedule(@Param('id') id: any, @Body() cars: any) {
    //     return this.scheduleService.createCarOfSchedule(id, cars)
    // }

    @Get()
    getAllScheduleToCar() {
        return this.scheduleService.getAllSchedule();
    }

    @Get('scheduleMoreThanCurrentDate')
    getAllScheduleMoreThanOrEqualCurrentDate() {
        return this.scheduleService.getAllScheduleMoreThanOrEqualCurrentDate();
    }

    // @Get(':id')
    // getScheduleWithCar(@Param('id') id: any) {
    //     return this.scheduleService.getScheduleWithCar(id)
    // }

    // @Delete(':id')
    // deleteCarInSchedule(@Param('id') scheduleId: any, @Body() carId: any) {
    //     return this.scheduleService.deleteCarInSchedule(scheduleId, carId)
    // }

    @Patch(':id')
    updateSchedule(@Param('id') id: any, @Body() updateScheduleDto: any) {
        return this.scheduleService.updateSchedule(id, updateScheduleDto)
    }

    @Get('ticket/:id')
    getScheduleTicket(@Param('id') id: any) {
        return this.scheduleService.getScheduleTicket(id)
    }
}