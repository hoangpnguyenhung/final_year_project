import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { Career } from "../entity/career.entity";

export class CreateCvDto {

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    idCard: string;

    @IsNotEmpty()
    dateOfBirth: Date;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    education: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    introduce: string;

    user: number

    career: number
}