import { IsNotEmpty } from "class-validator";

export class CreateCheduleDto {
    @IsNotEmpty()
    price?: number;

    @IsNotEmpty()
    startTime?: Date;

    @IsNotEmpty()
    endTime?: Date;

    departureAddress?: number;

    destinationAddress?: number;

    @IsNotEmpty()
    distance?: string;
}