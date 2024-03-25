import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "../entity/ticket.entity";
import { Repository } from "typeorm";
import { CreateTicketDto } from "../dto/ticket.dto";
import { Schedule } from "src/schedule/entity/schedule.entity";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
    ) {}
    
    async create(scheduleId: any, createTicketDto: CreateTicketDto, userId: any): Promise<void> {
        

        // const ticketInfor = await this.ticketRepository.save(ticket)

        // const ticketId = ticketInfor
        const seats = createTicketDto.seats
        const money = createTicketDto.totalMoney / seats.length

        for (let i = 0; i < seats.length; i++) {
            // const ticket_seat = new TicketToSeat()

            // ticket_seat.seat_status = "fullfill"
            // ticket_seat.ticket = ticketId
            // ticket_seat.seat = seats[i]

            // await this.ticketToSeatRepository.save(ticket_seat)
            const ticket = new Ticket()

            ticket.totalMoney = money
            ticket.fullname = createTicketDto.fullName
            ticket.phoneNumber = createTicketDto.phoneNumber
            ticket.email = createTicketDto.email
            ticket.city = createTicketDto.city
            ticket.district = createTicketDto.district
            ticket.user = userId
            ticket.schedule = scheduleId
            ticket.seat = seats[i]
            
            await this.ticketRepository.save(ticket)
        }
    }
    
    getAll(): Promise<Ticket[]> {
        return this.ticketRepository.find({
            relations: ['seat', 'schedule', 'user', 'schedule.departureAddress', 'schedule.destinationAddress'],
            order:{
                created_at: 'DESC'
            }
        })
    }

    getOne(ticketId: any): Promise<Ticket> {
        return this.ticketRepository.findOne({
            where: {id: ticketId},
            relations: ['user', 'seat', 'seat.car', 'schedule', 'schedule.departureAddress', 'schedule.destinationAddress']
        })
    }

    getTicketByUser(userId: any): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: {user: {
                id: userId
            }},
            relations: ['schedule', 'seat', 'schedule.departureAddress', 'schedule.destinationAddress', 'user'],
            order:{
                created_at: 'DESC'
            }
        })
    }

    //Change status ticket by driver, when driver click done in schedule
    async updateStatusByDriver(scheduleId: number) {
        const tickets = await this.ticketRepository.find({
            where: {schedule: {
                id: scheduleId
            }}
        })
        await this.scheduleRepository.update(scheduleId, {status: "completed"})
        tickets.forEach(async ticket => {
            await this.ticketRepository.update(ticket.id, {status: "completed"})
        })
    }

    //Delete schedule
    async cancelSchedule(scheduleId: number) {
        const tickets = await this.ticketRepository.find({
            where: {schedule: {
                id: scheduleId
            }}
        })
        await this.scheduleRepository.update(scheduleId, {status: "cancelled"})
        tickets.forEach(async ticket => {
            await this.ticketRepository.update(ticket.id, {status: "cancelled"})
        })
    }

    async cancelTicket(ticketId: number) {
        const ticket = await this.ticketRepository.findOne({
            where: {id: ticketId},
            relations: ['schedule']
        })

        const now = new Date()
        const startTime = new Date(ticket.schedule.startTime)
        const updateDate = new Date(startTime.getTime() - 86400000)
        if(now > updateDate) {
            return "You can not cancel this ticket because it only has 1 day left to depart"
        } else {
            await this.ticketRepository.update(ticketId, {status: "cancelled"})
        }
    }

    async statisticByUser(year: number): Promise<any> {
        const queryBiulder = this.ticketRepository.createQueryBuilder('ticket')
        queryBiulder
            .leftJoinAndSelect('ticket.user', 'user')
            .select('user.name')
            .addSelect('SUM(ticket.totalMoney)', 'money')
            .where(`EXTRACT(YEAR FROM ticket.created_at) = :year`, { year })
            .andWhere("ticket.status = :status", {status: "completed"})
            .groupBy('user.name')
            .orderBy('money', "DESC")
            .limit(10)
        const results = await queryBiulder.getRawMany();
        return results;
    }

    async statisticByMonth(year: number): Promise<any> {
        const queryBiulder = this.ticketRepository.createQueryBuilder('ticket')
        queryBiulder
            .select('EXTRACT(MONTH FROM ticket.created_at)', 'month')
            .addSelect('SUM(ticket.totalMoney)', 'total')
            .where(`EXTRACT(YEAR FROM ticket.created_at) = :year`, { year })
            .andWhere("ticket.status = :status", {status: "completed"})
            .groupBy('month')
            .orderBy('total', "DESC")
        const results = await queryBiulder.getRawMany();
        return results;
    }
}