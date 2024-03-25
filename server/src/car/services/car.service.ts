import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../entity/car.entity";
import { Repository } from "typeorm";
import { CreateCarDto } from "../dto/car.dto";

@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

    async create(createCarDto: any): Promise<string> {
        if (createCarDto.type === "bed") {
            createCarDto.name = "B" + createCarDto.name
            try {
                await this.carRepository.save(createCarDto)
            } catch (error) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "Name car is existed into the system",
                  }, HttpStatus.FORBIDDEN, {
                    cause: error
                });
            }
        } else if (createCarDto.type === "chair") {
            createCarDto.name = "C" + createCarDto.name
            try {
                await this.carRepository.save(createCarDto)
            } catch (error) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "Name car is existed into the system",
                  }, HttpStatus.FORBIDDEN, {
                    cause: error
                });
            }
        } else {
            createCarDto.name = "L" + createCarDto.name
            try {
                await this.carRepository.save(createCarDto)
            } catch (error) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "Name car is existed into the system",
                  }, HttpStatus.FORBIDDEN, {
                    cause: error
                });
            }
        }
        return "A new car is created successfully"
    }

    getOne(id: number) {
        return this.carRepository.findOne({
            where: {id},
            relations: ['user', 'seats'],
            order: {
                seats: {
                    id: "ASC",
                }
            }
        });
    }

    getAll() {
        return this.carRepository.find({
            relations: ['user'],
            order:{
                id: 'DESC'
            }
        });
    }

    async update(id: number, updateCar: any): Promise<string> {
        await this.carRepository.update(id, updateCar)
        return "The car is updated successfully"
    }
}