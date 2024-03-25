import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CareerService } from '../services/career.service';
import { CreateCareerDto } from '../dto/career.dto';

@Controller('career')
export class CareerController {
    constructor(private careerService: CareerService){}

    @Post()
    create(@Body() createCareerDto: CreateCareerDto) {
        return this.careerService.create(createCareerDto)
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.careerService.getOne(id)
    }

    @Get()
    getAll() {
        return this.careerService.getAll()
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCareerDto: any) {
        return this.careerService.update(id, updateCareerDto)
    }
}