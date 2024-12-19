import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel.name)
    private UsersModel: Model<UsersDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}
}
