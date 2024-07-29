import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from "@/auth/guards";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(
      @Request() req
  ) {
    return req.user;
  }
}
