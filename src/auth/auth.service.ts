import { CreateUserDto } from './../users/dto/create-user.dto';
import {
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async createUser(CreateUserDto: CreateUserDto) {
        const user: any = await this.usersService.create(CreateUserDto);
        const payload = { userId: user._id };
        const access_token = await this.jwtService.sign(payload);
        return access_token;
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user: any = await this.usersService.findOne(
            loginUserDto.username,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user._id };
        const access_token = await this.jwtService.sign(payload);

        return access_token;
    }
}
