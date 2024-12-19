import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.BROKER_URI],
      },
      consumer: {
        groupId: 'auth-consumer-0454',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
