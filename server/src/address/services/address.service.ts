import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../entity/address.entity";
import { Repository } from "typeorm";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ) {}

    async create(address: any): Promise<string> {
        await this.addressRepository.insert(address)
        return "A new address is created successfully"
    }

    getAll(): Promise<Address[]> {
        return this.addressRepository.find({
            order:{
                created_at: 'DESC'
            }
        })
    }

    getOne(id: number): Promise<Address> {
        return this.addressRepository.findOneBy({id})
    }

    async update(id: number, updateDto: any): Promise<string> {
        await this.addressRepository.update(id, updateDto)
        return "The Address is updated successfully"
    }
} 
