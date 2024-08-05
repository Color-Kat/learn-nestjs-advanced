import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto";
import { AuthService } from "@/auth/auth.service";
import { LoginDto, Validate2FATokenDto } from "@/auth/dto";
import { GetUser } from "@/auth/decorator";
import { JwtAuthGuard } from "@/auth/guards";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@/user/user.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    @ApiOperation({summary: 'Register a new user'})
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created, it will return the created user.',
    })
    register(
        @Body() userDto: CreateUserDto
    ) {
        return this.userService.create(userDto);
    }

    @Post('login')
    @ApiOperation({summary: 'Login a user'})
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in, it will return the jwt access_token.',
    })
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

    @Get('profile')
    @UseGuards(AuthGuard('bearer'))
    getProfile(
        @GetUser() user: User
    ) {
        delete user.password;

        return {
            message: 'auth with api key',
            user
        };
    }
}
