import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    city: string;

    isActive: boolean;
}

export class UpdateAddressDto {
    name: string;
    city: string;
    type: string;
    isActive: boolean;
}