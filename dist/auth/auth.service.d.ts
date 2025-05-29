import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(CreateUserDto: CreateUserDto): Promise<string>;
    login(loginAuthDto: LoginAuthDto): Promise<string>;
    validateToken(token: string): Promise<any>;
}
