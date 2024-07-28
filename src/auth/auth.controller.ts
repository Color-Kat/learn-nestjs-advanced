import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Post('register')
    signup(
        @Body() userDto: CreateUserDto
    ) {
        return this.userService.create(userDto);
    }
}
