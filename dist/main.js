"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public'));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(``);
    console.log(`🚀 Backend:  http://localhost:${port}/api`);
    console.log(`🌐 Сайт:     http://localhost:${port}`);
    console.log(``);
    console.log(`Тестовые аккаунты:`);
    console.log(`  Client:  +998903333333`);
    console.log(`  Partner: +998902222222`);
    console.log(`  Admin:   +998901111111`);
    console.log(``);
}
bootstrap();
//# sourceMappingURL=main.js.map