"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const auth_service_1 = require("./auth/auth.service");
const jwt_guard_1 = require("./auth/guards/jwt.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const authService = app.get(auth_service_1.AuthService);
    app.useGlobalGuards(new jwt_guard_1.JwtAuthGuard(authService));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'https://react-blog-rho-seven.vercel.app',
        ],
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map