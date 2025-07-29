import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Sirve archivos desde src/imgs/ como /media/
  app.useStaticAssets(join(process.cwd(), 'src', 'imgs'), {
    prefix: '/media/',
  });

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
