import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AxiosService } from 'src/core/modules/axios/axios.service';
import { Service_Api_Url } from 'src/utils/service_api_url';

@Injectable()
export class PropertyManagementService {
  constructor(
    private httpService: AxiosService,
    @Inject('PROPERTY_SERVICE')
    private readonly propertyClient: ClientKafka,
  ) {}

  public async welcomePage() {
    return await this.httpService.request(
      'GET',
      Service_Api_Url.property_mgt_service,
    );
  }

  public async getTenantDashboard(tenantId: string) {
    return await this.httpService.request(
      'GET',
      `${Service_Api_Url.property_mgt_service}tenants/dashboard/${tenantId}`,
      null,
      {},
    );
  }

  public async getPropertiesSearch(queryData: any = {}) {
    return await this.httpService.request(
      'GET',
      `${Service_Api_Url.property_mgt_service}properties/search`,
      null,
      queryData,
    );
  }
}
