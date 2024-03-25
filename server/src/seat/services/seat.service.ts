import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seat } from "../entity/seat.entity";
import { Repository } from "typeorm";
import { Car } from "src/car/entity/car.entity";

@Injectable()
export class SeatService {
    constructor(
        @InjectRepository(Seat) private seatRepository: Repository<Seat>,
        @InjectRepository(Car) private carRepository: Repository<Car>
    ) {}

    async create(carId: any) {
        const car = await this.carRepository.findOne({
            relations: ['seats'],
            where: {id: carId}
        })
        if(car.seats.length === 0) {
            const toltalFloor = car.numberOfFloor
            const totalColumn = car.totalColumn
            const totalRow = car.totalRow
    
            for(let floor = 1; floor <= toltalFloor; floor++) {
                for (let row = 1; row <= totalRow; row++) {
                    for (let column = 1; column <= totalColumn; column++) {
                        const seatName = String.fromCharCode(64 + column) + row.toString();
                        const seat = new Seat();
                        floor === 2 ? seat.name = seatName + "'" : seat.name = seatName 
                        seat.car = car
                        seat.status = 'available'
                        await this.seatRepository.save(seat)
                    }
                }
            }
    
            return "Create successfully"
        } else {
            return "Seat existed into car"
        }
    }

    async update(id: any, updateSeatDto: any) {
        await this.seatRepository.update(id, updateSeatDto)
    }
}