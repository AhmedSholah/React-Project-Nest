import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    password: string;
}
