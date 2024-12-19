export const UserRoles = {
  1: 'HOMEOWNER',
  2: 'CONTRACTOR',
  3: 'PROPERTY_MANAGER',
  4: 'TENANT',
};

export interface UserTokenPayload {
  user: {
    name: string;
    sub: number;
    type?: string;
    userType?: string;
    email?: string;
  };
}

export enum JobStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
  IN_REVIEW = 'IN_REVIEW',
}
