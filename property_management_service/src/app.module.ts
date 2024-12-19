import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { TenanciesModule } from './modules/tenancies/tenancies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN_URI),
    AuthModule,
    PropertiesModule,
    JobsModule,
    TenanciesModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
