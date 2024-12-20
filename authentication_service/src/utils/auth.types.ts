export interface JwtPayload {
  name: string;
  sub: number;
  email?: string;
  type?: string;
}
