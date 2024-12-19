import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

enum PropertyType {
  FOR_RENT = 'FOR_RENT',
  FOR_LEASE = 'FOR_LEASE',
  FOR_SALE = 'FOR_SALE',
}

export interface PropertiesInterface {
  _id?: Types.ObjectId | string;
  ownerId: string;
  tenantId: string;
  name: string;
  images: string[];
  status: PropertyStatus;
  type?: PropertyType;
  noOfBedrooms?: number;
  noOfBathrooms?: number;
  address?: Record<string, string>;
  area?: string;
  description?: string;
  isDeleted?: boolean;
}

export type PropertiesDocument = PropertiesModel & Document;

@Schema({ timestamps: true, collection: 'properties' })
export class PropertiesModel implements PropertiesInterface {
  @Prop({ type: String })
  ownerId: string;

  @Prop({ type: String })
  tenantId: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Array<string> })
  images: string[];

  @Prop({ type: String })
  area: string;

  @Prop({ type: Number })
  noOfBedrooms: number;

  @Prop({ type: Number })
  noOfBathrooms: number;

  @Prop({ type: String, enum: PropertyStatus })
  status: PropertyStatus;

  @Prop({ type: String, enum: PropertyType })
  type: PropertyType;

  @Prop({ type: Object })
  address: Record<string, string>;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const PropertiesSchema = SchemaFactory.createForClass(PropertiesModel);
