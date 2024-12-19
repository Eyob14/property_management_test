import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserPermissionsInterface {
  _id?: string;
  name: string;
  operation: string;
  description: string;
  isDeleted?: boolean;
}

export type UserPermissionsDocument = UserPermissionsModel & Document;

@Schema({ timestamps: true, collection: 'user_permissions' })
export class UserPermissionsModel implements UserPermissionsInterface {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  operation: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean })
  isDeleted?: boolean;
}

export const UserPermissionsSchema =
  SchemaFactory.createForClass(UserPermissionsModel);
