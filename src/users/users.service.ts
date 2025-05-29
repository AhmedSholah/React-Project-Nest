import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUserEmail: any = await this.userModel.findOne({
            email: createUserDto.email,
        });
        const existUsername: any = await this.userModel.findOne({
            username: createUserDto.username,
        });

        if (existingUserEmail) {
            throw new ConflictException('User with this email already exists');
        }
        if (existUsername) {
            throw new ConflictException(
                'User with this username already exists',
            );
        }

        const user = await this.userModel.create(createUserDto);

        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    async findOne(email: string) {
        const user = await this.userModel
            .findOne({ email })
            .select('+password');

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
