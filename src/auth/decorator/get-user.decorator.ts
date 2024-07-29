import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadType } from "@/auth/types";

export const GetUser = createParamDecorator(
    (data: keyof JwtPayloadType | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if(!request.user) throw new UnauthorizedException();

        if(data === undefined) return request.user;

        if(data) return request.user[data];

        return request.user;
    },
);