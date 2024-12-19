import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UsersDocument,
  UsersInterface,
  UsersModel,
} from 'src/models/users.model';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { CustomHttpException } from 'src/utils/custom_error_class';
import { UserRoles, USER_TYPES } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

interface JwtPayload {
  name: string;
  sub: number;
  email?: string;
  type?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UsersModel.name)
    private usersModel: Model<UsersDocument>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    // private readonly logger: CustomLoggerService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match: boolean = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(payload: JwtPayload, role_id: number) {
    const jwtSignOptions = {
      secret:
        role_id === USER_TYPES.HOMEOWNER
          ? process.env.HOMEOWNER_KEY
          : role_id === USER_TYPES.PROPERTY_MANAGER
            ? process.env.PROPERTY_MANAGER_KEY
            : role_id === USER_TYPES.CONTRACTOR
              ? process.env.CONTRACTOR_KEY
              : role_id === USER_TYPES.TENANT
                ? process.env.TENANT_KEY
                : 'secret',

      // expiresIn: process.env.TOKEN_EXPIRATION
    };
    const token = await this.jwtService.signAsync(payload, jwtSignOptions);
    return token;
  }
  public async signUp(user: UsersInterface) {
    try {
      // this.logger.logActivity('signUp', '', user.userType, {
      //   userEmail: user.email,
      // });
      const userExist = await this.usersModel.findOne({ email: user.email });

      if (userExist) {
        throw CustomHttpException.forbidden('This email already exist');
      }

      if (user.password !== undefined)
        user.password = await this.hashPassword(user.password);
      const newUser = await this.usersModel.create(user);

      if (!newUser) {
        throw CustomHttpException.internalServerError(
          'User registration failed',
        );
      }

      const userObject = newUser.toObject();
      if (user.password !== undefined) delete userObject.password;

      const payload: JwtPayload = {
        name: newUser._id.toString(),
        sub: UserRoles[newUser.userType],
      };
      const token = await this.generateToken(
        payload,
        UserRoles[newUser.userType],
      );

      return { data: userObject, token };
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      const errorMsg = error.message ?? 'An unexpected error occurred';
      throw CustomHttpException.internalServerError(
        `SignUp failed: ${errorMsg}`,
      );
    }
  }

  public async login(data: UsersInterface) {
    try {
      // this.logger.log(`login user:`, '', '', { userEmail: data.email });

      const payload: JwtPayload = {
        name: data._id.toString(),
        sub: UserRoles[data.userType],
      };
      const token = await this.generateToken(payload, UserRoles[data.userType]);
      data.password = undefined;
      return {
        data,
        token,
      };
    } catch (error) {
      // this.logger.error(
      //   `Failed to login: ${error.message || 'An unexpected error occurred'}`,
      // );
      throw CustomHttpException.internalServerError(
        `Login failed: ${error.message}`,
      );
    }
  }

  public async getUserByEmail(email: string): Promise<UsersInterface | null> {
    const user = (await this.usersModel.findOne({ email })) as UsersDocument;
    return user ? user.toObject() : null;
  }

  public async validateUser(
    email: string,
    pass: string,
  ): Promise<UsersInterface | null> {
    // Find if user exists with this email
    const user = await this.getUserByEmail(email);

    if (!user || user.password === undefined) {
      return null;
    }

    // Check if the user password matches
    const match: boolean = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    return user;
  }
}
