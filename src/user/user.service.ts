import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/user/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "@/auth/dto/login.dto";

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

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id});

        if(!user) {
            throw new UnauthorizedException('Could not find the user');
        }

        return user;
    }

    async findOneByEmail(email: LoginDto['email']): Promise<User> {
        const user = await this.userRepository.findOneBy({email: email});

        if(!user) {
            throw new UnauthorizedException('Could not find the user');
        }

        return user;
    }

    async update2FASecretKey(
        userId: number,
        secret: string
    ): Promise<UpdateResult> {
        return await this.userRepository.update(
            { id: userId },
            {
                enable2FA: true,
                twoFASecret: secret
            }
        );
    }
}
