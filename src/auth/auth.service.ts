import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { LoginDto } from "@/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ArtistService } from "@/artist/artist.service";
import { Enable2FAType, JwtPayloadType } from "@/auth/types";
import * as speakeasy from 'speakeasy';
import { UpdateResult } from "typeorm";
import { UrlService } from "@/common/url.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly urlService: UrlService,

        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly artistService: ArtistService
    ) {
    }

    async login(loginDto: LoginDto): Promise<
        { accessToken: string } |
        { validate2FA: string, message: string }
    > {
        const user = await this.userService.findOneByEmail(loginDto.email);

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Password does not match');
        }

        // Get data for sign in JWT token
        const payload: JwtPayloadType = { email: user.email, userId: user.id };

        // Add artistId to payload if the user is an artist
        const artist = await this.artistService.findArtistByUserId(user.id);
        if (artist) payload.artistId = artist.id;

        // 2FA
        if(user.enable2FA && user.twoFASecret) {
            // Send the validation request link
            return {
                validate2FA: this.urlService.to('/auth/validate-2fa'),
                message: 'Please, send the one time code from your Google Authenticator App'
            }
        }

        // If 2FA is disabled, then send the JWT access token
        return {
            accessToken: this.jwtService.sign(
                payload,
                { secret: this.configService.get('JWT_SECRET') }
            )
        };
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.findOneById(userId);

        // 2FA is already enabled
        if (user.enable2FA) {
            return { secret: user.twoFASecret };
        }

        // Generate 2FA secret token
        const secret = speakeasy.generateSecret();
        user.twoFASecret = secret.base32;

        await this.userService.update2FASecretKey(user.id, user.twoFASecret);
        return { secret: user.twoFASecret };
    }

    async validate2FAToken(
        userId: number,
        token: string
    ): Promise<{verified: boolean}> {
        // Find user by provided id
        const user = await this.userService.findOneById(userId);

        // Validate 2FA
        const verified = speakeasy.totp.verify({
            secret: user.twoFASecret,
            encoding: 'base32',
            token
        });

        return {verified};
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId);
    }
}
