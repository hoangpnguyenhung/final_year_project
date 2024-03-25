import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rate } from "../entity/rate.entity";

@Injectable()
export class RateService {
    constructor(@InjectRepository(Rate) private rateRepository: Repository<Rate>) {}

    async create(ticketId: any, userId: any, createRateDto: any): Promise<Rate> {
        createRateDto.ticket = ticketId
        createRateDto.user = userId
        return await this.rateRepository.save(createRateDto)
    }
    
    async getAll(scheduleId: any) {
        return await this.rateRepository.find({
            where: {ticket: {
                schedule: {
                    id: scheduleId
                }
            }}, 
            relations: ['user', 'ticket'],
            order:{
                created_at: 'DESC'
            }
        })
    }

    async getOne(ticketId: any): Promise<Rate> {
        return this.rateRepository.findOne({
            where: {ticket: {
                id: ticketId
            }}
        })
    }
}