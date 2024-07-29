import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { AuthService } from "@/auth/auth.service";
import { LoginDto, Validate2FATokenDto } from "@/auth/dto";
import { JwtAuthGuard } from "@/auth/guards";
import { GetUser } from "@/auth/decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    register(
        @Body() userDto: CreateUserDto
    ) {
        return this.userService.create(userDto);
    }

    @Post('login')
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @GetUser('userId') userId: number,
    ) {
        return this.authService.enable2FA(userId);
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @GetUser('userId') userId: number,
    ) {
        return this.authService.disable2FA(userId);
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(
        @GetUser('userId') userId: number,
        @Body() validateTokenDto: Validate2FATokenDto
    ) {
        return this.authService.validate2FAToken(
            userId,
            validateTokenDto.token
        );
    }
}
