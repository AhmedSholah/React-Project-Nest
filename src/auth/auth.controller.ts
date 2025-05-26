import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/types/api-response';
import { JwtAuthGuard } from './guards/jwt.guard';
import { PublicEndpoint } from './PublicEndpoint';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @PublicEndpoint()
    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<ApiResponse<null>> {
        const token = await this.authService.register(createUserDto);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return {
            success: true,
            message: 'User registered successfully',
            data: null,
        };
    }

    @PublicEndpoint()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginAuthDto: LoginAuthDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<ApiResponse<null>> {
        const token = await this.authService.login(loginAuthDto);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return {
            success: true,
            message: 'User logged in successfully',
            data: null,
        };
    }
}
