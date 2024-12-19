import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDocument, UsersModel } from 'src/models/users.model';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel.name)
    private UsersModel: Model<UsersDocument>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    // private readonly logger: CustomLoggerService,
  ) {}
}
