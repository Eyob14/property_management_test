import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface TenantsInterface {
  _id?: Types.ObjectId | string;
  name: string;
  domain: string;
  isDeleted?: boolean;
}

export type TenantsDocument = TenantsModel & Document;

@Schema({ timestamps: true, collection: 'tenants' })
export class TenantsModel implements TenantsInterface {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  domain: string;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const TenantsSchema = SchemaFactory.createForClass(TenantsModel);
