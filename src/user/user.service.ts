import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/user/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        // Generate hash for password
        const salt = await bcrypt.genSalt();
        userDto.password = await bcrypt.hash(userDto.password, salt);

        const user = await this.userRepository.save(userDto);
        delete user.password; // Hide password for response

        return user;
    }
}
