import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly reflector: Reflector;
    constructor(private readonly authService: AuthService) {
        this.reflector = new Reflector();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const cookie = request.cookies;

        if (!cookie.access_token) {
            throw new UnauthorizedException('Token not found');
        }

        const decoded = await this.authService.validateToken(
            cookie.access_token,
        );

        request.user = decoded;

        return true;
    }
}
