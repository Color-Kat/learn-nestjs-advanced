import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "@/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/auth/strategies";
import { ArtistModule } from "@/artist/artist.module";
import { UrlService } from "@/common/url.service";

@Module({
    imports: [
        UserModule,
        ArtistModule,
        JwtModule.register({})
    ],
    providers: [AuthService, JwtService, JwtStrategy, UrlService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {
}
