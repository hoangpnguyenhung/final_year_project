import { IsNotEmpty } from "class-validator";

export class CreateCareerDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    level: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    formality: string;

    @IsNotEmpty()
    experience: string;

    @IsNotEmpty()
    salary: string;

    @IsNotEmpty()
    workspace: string;

    @IsNotEmpty()
    deadline: Date;

    @IsNotEmpty()
    welfare: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    requirement: string;

    @IsNotEmpty()
    contact: string;

    @IsNotEmpty()
    include: string;

}