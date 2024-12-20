import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum JobStatus {
  NOT_STARTED = 'NOT_STARTED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  IN_REVIEW = 'IN_REVIEW',
}

export interface JobsInterface {
  _id?: Types.ObjectId | string;
  propertyId: string;
  tenantId: string;
  assignedTo?: string;
  createdBy: string;
  status: JobStatus;
  jobTitle: string;
  description?: string;
  dueDate?: Date;
  startDate?: Date;
  isDeleted?: boolean;
}

export type JobsDocument = JobsModel & Document;

@Schema({ timestamps: true, collection: 'jobs' })
export class JobsModel implements JobsInterface {
  @Prop({ type: String })
  propertyId: string;

  @Prop({ type: String })
  tenantId: string;

  @Prop({ type: String })
  assignedTo?: string;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: String })
  jobTitle: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: String, enum: JobStatus })
  status: JobStatus;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const JobsSchema = SchemaFactory.createForClass(JobsModel);
