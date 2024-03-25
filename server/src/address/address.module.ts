import { Module } from '@nestjs/common';
import { AdressController } from './controllers/address.controller'
import { AddressService } from './services/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Address])
    ],
    controllers: [AdressController],
    providers: [AddressService],
})
export class AddressModule {};