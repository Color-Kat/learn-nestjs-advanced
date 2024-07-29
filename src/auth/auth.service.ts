import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { LoginDto } from "@/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ArtistService } from "@/artist/artist.service";
import { JwtPayloadType } from "@/auth/types";

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly artistService: ArtistService
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

        const payload: JwtPayloadType = {email: user.email, userId: user.id};

        const artist = await this.artistService.findArtistByUserId(user.id);
        if(artist) payload.artistId = artist.id;

        return {
            accessToken: this.jwtService.sign(
                payload,
                {secret: this.configService.get('JWT_SECRET')}
            )
        };
    }
}
