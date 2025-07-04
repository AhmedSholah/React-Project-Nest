import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    const authService = app.get(AuthService);
    app.useGlobalGuards(new JwtAuthGuard(authService));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'https://blogify-react-app.vercel.app',
        ],
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
    // await app.listen(3000);
}
bootstrap();

export default bootstrap;
