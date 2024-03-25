import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { CreateAddressDto, UpdateAddressDto } from '../dto/address.dto';

@Controller('address')
export class AdressController {
    constructor(private addressService: AddressService){}

    @Post('')
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(createAddressDto);
    }
    
    @Get('')
    getAll() {
        return this.addressService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.addressService.getOne(id)
    }

    @Patch(':id')
    update(@Param() id: number, @Body() updateAddressDto: UpdateAddressDto) {
        return this.addressService.update(id, updateAddressDto)
    }

}