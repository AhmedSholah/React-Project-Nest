import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
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
