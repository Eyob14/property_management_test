import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface JobHistoriesInterface {
  _id?: Types.ObjectId | string;
  jobId: string;
  description?: string;
  completedDate?: Date;
  isDeleted?: boolean;
}

export type JobHistoriesDocument = JobHistoriesModel & Document;

@Schema({ timestamps: true, collection: 'jobHistories' })
export class JobHistoriesModel implements JobHistoriesInterface {
  @Prop({ type: String })
  propertyId: string;

  @Prop({ type: String })
  jobId: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Date })
  completedDate?: Date;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const JobHistoriesSchema =
  SchemaFactory.createForClass(JobHistoriesModel);
