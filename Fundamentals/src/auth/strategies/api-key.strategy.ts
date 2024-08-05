import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'bearer') {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    async validate(apiKey: string) {
        const isApiKeyValid = await this.authService.validateUserByApiKey(apiKey);
        return isApiKeyValid;
    }
}