import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { LoginDto } from "@/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<{accessToken: string}> {
        const user = await this.userService.findOne(loginDto);

        const isPasswordMatch = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if(!isPasswordMatch) {
            throw new UnauthorizedException('Password does not match');
        }

        const payload = {email: user.email, sub: user.id};
        return {
            accessToken: this.jwtService.sign(
                payload,
                {secret: this.configService.get('JWT_SECRET')}
            )
        };
    }
}
