import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TenantsDocument, TenantsModel } from 'src/models/tenants.model';
import { Model } from 'mongoose';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(TenantsModel.name)
    private tenantsModel: Model<TenantsDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}
  async getTenantDashboard(tenantId: string) {
    // const tenant = await this.tenantsModel.findById(tenantId).exec();
    return tenantId;
  }
}
