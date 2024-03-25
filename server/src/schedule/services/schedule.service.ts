import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entity/schedule.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Car } from 'src/car/entity/car.entity';
 
@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
        @InjectRepository(Car) private carRepository: Repository<Car>,
    ) {}

    async create(createScheduleDto: any): Promise<string>{
        const scheduleExisted = await this.scheduleRepository.findOne({
            where: {
                car: {
                    id: createScheduleDto.car
                },
                startDay: Between(new Date(createScheduleDto.startDay), new Date(createScheduleDto.endDay)),
                endDay: Between(new Date(createScheduleDto.startDay), new Date(createScheduleDto.endDay)),
            }
        })

        if(scheduleExisted) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Xe đang hoạt động trong khoảng thời gian này",
              }, HttpStatus.FORBIDDEN);
        }

        await this.scheduleRepository.save(createScheduleDto)
        return "A new Schedule is created successfully"
    }

    // async createCarOfSchedule(id: any, carId: any) {
    //     const schedule = await this.scheduleRepository.findOne({
    //         where: {id}
    //     })
          
    //     const car = await this.carRepository.findOne({
    //         where: {id: carId[0]}
    //     })
    //     const data = {
    //         schedule,
    //         car,
    //     }

    //     return this.scheduleToCarRepository.save(data)
    // }

    async getAllScheduleMoreThanOrEqualCurrentDate(): Promise<Schedule[]> {
        const date = new Date()
        return this.scheduleRepository.find({
            where: {
                isActive: true,
                status: "waiting",
                startDay: MoreThanOrEqual(date)
            },
            relations: ['departureAddress', 'destinationAddress', 'car'],
            order:{
                created_at: 'ASC'
            }
        });
    }

    async getAllSchedule(): Promise<Schedule[]> {
        return this.scheduleRepository.find({
            relations: ['departureAddress', 'destinationAddress', 'car', 'car.user'],
            order:{
                created_at: 'DESC'
            }
        });
    }

    // async getScheduleWithCar(scheduleId: any) {
    //     return this.scheduleToCarRepository.find({
    //         relations: ['car', 'schedule'],
    //         where: {
    //             schedule: {
    //                 id: scheduleId,
    //             },
    //         }
    //     })
    // }

    // async deleteCarInSchedule(scheduleId: any, carId: any) {
    //     return this.scheduleToCarRepository.delete({
    //         schedule: scheduleId,
    //         car: carId.carId
    //     })
    // }

    async updateSchedule(scheduleId: any, updateScheduleDto: any) {
        return this.scheduleRepository.update(scheduleId, updateScheduleDto)
    }

    //Select schedule to member can booking ticket
    async getScheduleTicket(scheduleId: any) {
        return this.scheduleRepository.findOne({
            where: {id: scheduleId},
            relations: ['departureAddress', 'destinationAddress', 'tickets.seat', 'car.seats'],
            order: {
                car: {
                    seats: {
                        id: "ASC"
                    }
                }
            }
        })
    }
}