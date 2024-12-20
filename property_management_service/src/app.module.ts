import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger/logger.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN_URI),
    PropertiesModule,
    TenantsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
