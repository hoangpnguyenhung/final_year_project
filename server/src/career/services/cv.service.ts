import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cv } from "../entity/cv.entity";
import { Repository } from "typeorm";
import { CreateCvDto } from "../dto/cv.dto";

@Injectable()
export class CvService {
    constructor(@InjectRepository(Cv) private cvRepository: Repository<Cv>) {}

    create(createCvDto: any, userId: number, careerId: number): Promise<Cv> {
        createCvDto.user = userId
        createCvDto.career = careerId
        return this.cvRepository.save(createCvDto)
    }

    getOne(id: number): Promise<Cv> {
        return this.cvRepository.findOne({
            where: {id},
            relations: ['user', 'career']
        })
    }

    getAll(): Promise<Cv[]> {
        return this.cvRepository.find({
            relations: ['user', 'career'],
            order:{
                created_at: 'DESC'
            }
        })
    }

    async update(id: number, updateCvDto: any): Promise<void> {
        await this.cvRepository.update(id, updateCvDto)
    }

    async delete(id: number): Promise<void> {
        await this.cvRepository.delete(id)
    }
}