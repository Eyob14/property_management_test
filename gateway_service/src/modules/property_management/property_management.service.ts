import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/core/modules/axios/axios.service';

@Injectable()
export class PropertyManagementService {
  constructor(
    private httpService: AxiosService,
    // @Inject('PROPERTY_SERVICE')
    // private readonly propertyClient: ClientKafka,
  ) {}
}
