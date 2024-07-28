import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { LoginDto } from "@/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOne(loginDto);

        const isPasswordMatch = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if(!isPasswordMatch) {
            throw new UnauthorizedException('Password does not match');
        }

        delete user.password;
        return user;
    }
}
