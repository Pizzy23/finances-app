import { Module } from '@nestjs/common';
import {
  AuthController,
  LoginController,
  RegisterController,
  TokenController,
} from './controllers/';

import {
  AuthService,
  BaseService,
  LoginService,
  RegisterService,
  TokenService,
} from './services';
import { LoginEntity, RegisterEntity, AuthEntity } from './entity';
import { PrismaService } from './config/prisma.service';

@Module({
  imports: [],
  controllers: [
    RegisterController,
    LoginController,
    AuthController,
    TokenController,
  ],
  providers: [
    AuthService,
    LoginService,
    RegisterService,
    TokenService,
    BaseService,
    PrismaService,
    LoginEntity,
    RegisterEntity,
    AuthEntity,
  ],
})
export class AppModule {}
