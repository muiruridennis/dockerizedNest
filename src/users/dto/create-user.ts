import { IsString } from 'class-validator';

export class CreateUserstDTO {

    @IsString()
    name: string;
    @IsString()
    age: string;

    @IsString()
    sex: string;
}