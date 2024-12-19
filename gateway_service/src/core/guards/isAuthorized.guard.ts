import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../modules/authorization/authorization.service';
import { UserRoles } from 'src/utils/constants';

@Injectable()
export class IsUserAuthorized implements CanActivate {
  private readonly logger = new Logger(IsUserAuthorized.name);

  constructor(protected authorizationService: AuthorizationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: { headers: { [x: string]: any }; user: any }) {
    const token =
      request.headers['x-api-key'] || request.headers['x-vapi-secret'];
    if (!token) {
      this.logger.warn('Attempt to access without a token');
      throw new UnauthorizedException('You must enter an access token');
    }

    const keys = [
      process.env.PROPERTY_MANAGER_KEY,
      process.env.HOMEOWNER_KEY,
      process.env.CONTRACTOR_KEY,
      process.env.TENANT_KEY,
      process.env.STAFF_TECHNICIANS_KEY,
      process.env.ADMIN_KEY,
      process.env.SOLE_TRADER_KEY,
      process.env.FORGOT_PASSWORD_KEY,
      process.env.SUPPLIERS_KEY,
      process.env.CREATE_USER_KEY,
      process.env.AI_ASSISTANT_KEY,
    ];

    for (const key of keys) {
      const { isValid, decoded } = this.authorizationService.verifyToken(
        token,
        key,
      );
      if (isValid) {
        this.logger.log(
          `User authorized: ${decoded.name} |-| ${UserRoles[decoded.sub]}`,
        );
        request.user = decoded; // Attach the decoded token to the request
        return true;
      }
    }

    this.logger.error('Unauthorized access attempt');
    throw new ForbiddenException(
      'You are not authorized, login to get the right access token',
    );
  }
}
