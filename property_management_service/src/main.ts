import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CustomLoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  // app.enableCors();
  // app.useLogger(app.get(CustomLoggerService));
  await app.listen(process.env.PORT);
}
bootstrap();
