import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { AuthService } from "@/auth/auth.service";
import { LoginDto } from "@/auth/dto/login.dto";

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
}
