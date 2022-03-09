import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {  
    @IsNotEmpty() @IsEmail()   email: string;
    @IsNotEmpty()  readonly password: string;
}
