import { Module } from '@nestjs/common';
import { RateController } from './controllers/rate.controller';
import { RateService } from './services/rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entity/rate.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Rate])
    ],
    controllers: [RateController],
    providers: [RateService],
})
export class RateModule {};