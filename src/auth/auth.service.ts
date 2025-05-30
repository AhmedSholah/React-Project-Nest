import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(CreateUserDto: CreateUserDto): Promise<string> {
        const user: any = await this.usersService.create(CreateUserDto);
        const payload = { userId: user._id };
        const access_token = await this.jwtService.sign(payload);
        return access_token;
    }

    async login(loginAuthDto: LoginAuthDto): Promise<string> {
        const user: any = await this.usersService.findOne(loginAuthDto.email);

        const isPasswordValid = await bcrypt.compare(
            loginAuthDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { userId: user._id };
        const access_token = await this.jwtService.sign(payload);

        return access_token;
    }

    async me(req) {
        const { userId } = req.user;

        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            success: true,
            message: 'User fetched successfully',
            data: user,
        };
    }

    async validateToken(token: string) {
        try {
            const decoded = await this.jwtService.verifyAsync(token);
            return decoded;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException('Invalid token');
        }
    }

    async logout() {
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
}
