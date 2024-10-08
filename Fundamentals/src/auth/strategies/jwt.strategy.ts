import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadType } from "@/auth/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt_secret')
        });
    }

    async validate(payload: JwtPayloadType) {
        return {
            email: payload.email,
            userId: payload.userId,
            artistId: payload.artistId,
        };
    }
}