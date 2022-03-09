import { IsString, IsNotEmpty,IsEmail } from 'class-validator';

export class CreateUserstDTO {

    @IsString() @IsNotEmpty() name: string;
    @IsString() @IsNotEmpty()  password: string;
    @IsString() @IsNotEmpty()  @IsEmail()  email: string;
}