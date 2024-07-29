import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadType } from "@/auth/types";

export const GetUser = createParamDecorator(
    (data: keyof JwtPayloadType | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if(data) return request.user[data];

        return request.user;
    },
);