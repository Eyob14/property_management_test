
export interface UserTokenPayload {
  user: {
    name: string;
    sub: number;
    type?: string;
    userType?: string;
    email?: string;
  };
}
