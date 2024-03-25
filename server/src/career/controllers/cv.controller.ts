import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CvService } from '../services/cv.service';
import { AuthGuard } from 'src/user/features/auth.guard';
import { CreateCvDto } from '../dto/cv.dto';

@Controller('cv')
export class CvController {
    constructor(private cvService: CvService){}

    @UseGuards(AuthGuard)
    @Post(':id')
    create(@Request() req: any, @Body() createCvDto: CreateCvDto, @Param('id') id: number) {
        return this.cvService.create(createCvDto, req.user.sub, id)
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.cvService.getOne(id)
    }

    @Get()
    getAll() {
        return this.cvService.getAll()
    }

    @Patch(':id')
    update(@Param('id') id: number,@Body() updateCvDto: any) {
        return this.cvService.update(id, updateCvDto)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.cvService.delete(id)
    }
}