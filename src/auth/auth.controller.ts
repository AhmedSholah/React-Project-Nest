import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    // @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }
}
