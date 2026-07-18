import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsString()
    name!: string;

    @Type(() => Number)
    @IsNumber()
    age!: number;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;
}