import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';

@Module({
  imports: [HttpModule],
  providers: [AxiosService],
  controllers: [],
  exports: [AxiosService],
})
export class AxiosModule {}
