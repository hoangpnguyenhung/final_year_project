import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Career } from "../entity/career.entity";
import { Repository } from "typeorm";
import { CreateCareerDto } from "../dto/career.dto";

@Injectable()
export class CareerService {
    constructor(@InjectRepository(Career) private careerRepository: Repository<Career>) {}

    async create(createCareerDto: CreateCareerDto): Promise<Career> {
        return this.careerRepository.save(createCareerDto)
    }

    async getOne(id: number): Promise<Career> {
        return this.careerRepository.findOne({
            where: {id}
        })
    }

    async getAll(): Promise<Career[]> {
        return this.careerRepository.find({
            order:{
                created_at: 'DESC'
            }
        })
    }

    async update(id: number, updateCareerDto: any): Promise<void> {
        await this.careerRepository.update(id, updateCareerDto)
    }
}