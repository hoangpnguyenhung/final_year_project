import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from '../services/car.service';
import { CreateCarDto, UpdateCarDto } from '../dto/car.dto';

@Controller('car')
export class CarController {
    constructor(private carService: CarService){}

    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        return this.carService.create(createCarDto)
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.carService.getOne(id);
    }

    @Get()
    getAll() {
        return this.carService.getAll();
    }

    @Patch(':id')
    update(@Param() id: number,@Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(id, updateCarDto)
    }
}