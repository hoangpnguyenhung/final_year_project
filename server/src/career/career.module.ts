import { Module } from '@nestjs/common';
import { CareerController } from './controllers/career.controller';
import { CareerService } from './services/career.service';
import { CvService } from './services/cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from './entity/career.entity';
import { Cv } from './entity/cv.entity';
import { CvController } from './controllers/cv.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Career, Cv])
    ],
    controllers: [CareerController, CvController],
    providers: [CareerService, CvService],
})
export class CareerModule {};