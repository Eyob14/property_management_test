import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserType {
  TENANT = 'TENANT',
  PROPERTY_MANAGER = 'PROPERTY_MANAGER',
  HOMEOWNER = 'HOMEOWNER',
  CONTRACTOR = 'CONTRACTOR',
  ADMIN = 'ADMIN',
}

export interface UsersInterface {
  _id?: string;
  tenantId?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  address?: Record<string, string>;
  phoneNumber?: string;
  isDeleted?: boolean;
  createdBy?: string;
}

export type UsersDocument = UsersModel & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UsersModel implements UsersInterface {
  @Prop({ type: String })
  tenantId: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: String })
  phoneNumber?: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Object })
  address: Record<string, string>;

  @Prop({ type: String, enum: UserType })
  userType: UserType;

  @Prop({ type: String })
  createdBy?: string;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
