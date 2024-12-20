import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Tenure {
  SHORT_TERM = 'short-term',
  LONG_TERM = 'long-term',
  MONTHLY = 'monthly',
}

export enum ContractStatus {
  ACTIVE = 'active',
  TERMINATED = 'terminated',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
}

export interface TenanciesInterface {
  _id?: Types.ObjectId | string;
  propertyId: string;
  tenantId: string;
  userId?: string;
  ownerId: string;
  bookingDate: Date;
  startDate?: Date;
  endDate?: Date;
  tenure: Tenure;
  rent?: number;
  securityDeposit?: number;
  status?: ContractStatus;
  paymentMethod?: PaymentMethod;
  contractDocument?: string;
  attachments?: string[];
  isDeleted?: boolean;
}

export type TenanciesDocument = TenanciesModel & Document;

@Schema({ timestamps: true, collection: 'tenancies' })
export class TenanciesModel implements TenanciesInterface {
  @Prop({ type: String, required: true })
  propertyId: string;

  @Prop({ type: String })
  ownerId: string;

  @Prop({ type: String })
  tenantId: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: Date, required: true })
  bookingDate: Date;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ type: String, enum: Tenure, required: true })
  tenure: Tenure;

  @Prop({ type: Number })
  rent?: number;

  @Prop({ type: Number })
  securityDeposit?: number;

  @Prop({ type: String, enum: ContractStatus })
  status?: ContractStatus;

  @Prop({ type: String, enum: PaymentMethod })
  paymentMethod?: PaymentMethod;

  @Prop({ type: String })
  contractDocument?: string;

  @Prop({ type: [String] })
  attachmentsUrls?: string[];

  @Prop({ type: Boolean })
  isDeleted?: boolean;
}

export const TenanciesSchema = SchemaFactory.createForClass(TenanciesModel);
