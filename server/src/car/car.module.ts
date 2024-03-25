import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entity/car.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Car])
    ],
    controllers: [CarController],
    providers: [CarService],
})
export class CarModule {};