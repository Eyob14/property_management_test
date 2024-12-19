import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface RolesInterface {
  _id?: Types.ObjectId | string;
  roleId: number;
  name: string;
  permissions: string[];
  isDeleted?: boolean;
}

export type RolesDocument = RolesModel & Document;

@Schema({ timestamps: true, collection: 'roles' })
export class RolesModel implements RolesInterface {
  @Prop({ type: Number })
  roleId: number;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Array<string> })
  permissions: string[];

  @Prop({ type: Boolean })
  isDeleted?: boolean;
}

export const RolesSchema = SchemaFactory.createForClass(RolesModel);
