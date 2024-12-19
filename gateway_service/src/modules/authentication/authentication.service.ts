import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AxiosService } from 'src/core/modules/axios/axios.service';
import { Service_Api_Url } from 'src/utils/service_api_url';

@Injectable()
export class AuthenticationService {
  constructor(
    private httpService: AxiosService,
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientKafka,
  ) {}
  public async welcomePage(user_id: string, user_role: string) {
    return await this.httpService.request(
      'GET',
      Service_Api_Url.auth_service,
      null,
      { user_id, user_role },
    );
  }
}
