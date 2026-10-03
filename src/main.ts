import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  // Веб-интерфейс (папка public рядом с package.json)
  app.useStaticAssets(join(process.cwd(), 'public'));

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
