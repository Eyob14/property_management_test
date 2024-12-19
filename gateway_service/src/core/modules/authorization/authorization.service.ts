import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthorizationService {
  public verifyToken(token: string, secretKey: string): any {
    try {
      // Verify and decode token
      const decoded = verify(token, secretKey);
      return { isValid: true, decoded };
    } catch (error) {
      return { isValid: false };
    }
  }
}
