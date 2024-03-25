import { IsNotEmpty } from "class-validator";
import { Schedule } from "src/schedule/entity/schedule.entity";
import { Seat } from "src/seat/entity/seat.entity";
import { User } from "src/user/entity/user.entity";

export class CreateTicketDto {

    @IsNotEmpty()
    totalMoney: number

    @IsNotEmpty()
    fullName: string

    @IsNotEmpty()
    phoneNumber: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    district: string

    user: User

    schedule: Schedule

    seats: Seat[]
}