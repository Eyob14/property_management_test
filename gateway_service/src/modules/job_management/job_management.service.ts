import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AxiosService } from 'src/core/modules/axios/axios.service';
import { Service_Api_Url } from 'src/utils/service_api_url';

@Injectable()
export class JobManagementService {
  constructor(
    private httpService: AxiosService,
    @Inject('JOB_SERVICE')
    private readonly jobClient: ClientKafka,
  ) {}

  public async welcomePage() {
    return await this.httpService.request(
      'GET',
      Service_Api_Url.job_mgt_service,
    );
  }
}
