import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
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
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return {
            success: true,
            message: 'User logged in successfully',
            data: null,
        };
    }

    @Get('me')
    async me(@Req() req): Promise<ApiResponse<any>> {
        return await this.authService.me(req);
    }

    @PublicEndpoint()
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Res({ passthrough: true }) res: Response,
    ): Promise<ApiResponse<null>> {
        res.cookie('access_token', '', {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 1,
        });

        return {
            success: true,
            message: 'User logged out successfully',
            data: null,
        };
    }
}
