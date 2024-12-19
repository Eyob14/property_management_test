import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getWelcomePage(user_id: string, user_role: string): string {
    return `Hello ${user_id} you are a(an) ${user_role} and welcome to LightWork Auth Service`;
  }
}
