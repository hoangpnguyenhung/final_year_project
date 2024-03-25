import { IsNotEmpty } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    totalRow: number;

    @IsNotEmpty()
    totalColumn: number;

    @IsNotEmpty()
    numberOfFloor: number;

    isActive: boolean;

    @IsNotEmpty()
    phoneNumber: string;

    user: string;
}

export class UpdateCarDto {
    name: string;

    type: string;

    totalRow: number;

    totalColumn: number;

    numberOfFloor: number;

    isActive: boolean;

    phoneNumber: string;

    user: string;
}