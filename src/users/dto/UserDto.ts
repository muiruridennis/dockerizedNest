import { IsNotEmpty,IsEmail } from 'class-validator';

export class UserDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  name: string;
    @IsNotEmpty()  @IsEmail()  email: string;
    // password is omitted from this class because you don't ever want to return the user's stored password.
}
