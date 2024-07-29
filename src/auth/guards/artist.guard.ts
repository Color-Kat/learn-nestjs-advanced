import { JwtGuard } from "@/auth/guards/jwt.guard";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ArtistGuard extends JwtGuard {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        error: any,
        user: any
    ): TUser {
        if(error || !user) {
            throw error || new UnauthorizedException();
        }

        if(user.artistId) return user;

        throw new UnauthorizedException('You are not an artist');
    }
}