import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.toLowerCase() : value,
    )
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    password: string;
}
