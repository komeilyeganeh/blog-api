import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsNumber()
  age!: number;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
