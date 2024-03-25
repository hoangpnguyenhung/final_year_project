import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    IdCard: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    email: string;

    isActive: boolean;

    city: string;

    district: string;

    role: string;
}

export class UpdateUserDto {
    name: string;

    username: string;

    password: string;

    IdCard: string;

    phoneNumber: string;

    email: string;

    isActive: boolean;

    city: string;

    district: string;

    role: string;
}