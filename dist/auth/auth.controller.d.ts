import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/types/api-response';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto, res: Response): Promise<ApiResponse<null>>;
    login(loginAuthDto: LoginAuthDto, res: Response): Promise<ApiResponse<null>>;
}
