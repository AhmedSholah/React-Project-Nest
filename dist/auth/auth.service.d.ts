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
    me(req: any): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../users/entities/user.entity").User, {}> & import("../users/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../users/entities/user.entity").User, {}> & import("../users/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    validateToken(token: string): Promise<any>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}
