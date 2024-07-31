import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/user/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { LoginDto } from "@/auth/dto/login.dto";
import { async } from "rxjs";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            const user = new User();
            user.firstName = userDto.firstName;
            user.lastName = userDto.lastName;
            user.email = userDto.email;
            user.apiKey = uuid();

            // Generate hash for password
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(userDto.password, salt);

            const savedUser = await this.userRepository.save(user);
            delete savedUser.password; // Hide password for response

            return savedUser;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('Could not find the user');
        }

        return user;
    }

    async findOneByEmail(email: LoginDto['email']): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email });

        if (!user) {
            throw new UnauthorizedException('Could not find the user');
        }

        return user;
    }

    async findOneByApiKey(apiKey: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ apiKey });

        if (!user) throw new UnauthorizedException('Could not find the user');

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

    async disable2FA(userId: number): Promise<UpdateResult> {

        return this.userRepository.update(
            { id: userId },
            {
                enable2FA: false,
                twoFASecret: null
            }
        );
    }
}
