import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "@/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "@/auth/strategies";

@Module({
    imports: [
        UserModule,
        JwtModule.register({})
    ],
    providers: [AuthService, JwtService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {
}
