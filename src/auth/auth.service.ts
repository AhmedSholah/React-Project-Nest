import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    createUser(CreateUserDto: CreateUserDto) {
        const user = this.usersService.create(CreateUserDto);
        return user;
    }
}
