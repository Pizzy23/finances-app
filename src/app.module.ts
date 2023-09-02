import { Module } from '@nestjs/common';
import {
  AuthController,
  LoginController,
  RegisterController,
  TokenController,
} from './context/controllers/';

import {
  AuthService,
  BaseService,
  LoginService,
  RegisterService,
  TokenService,
} from './context/services';
import { LoginEntity, RegisterEntity, AuthEntity } from './context/entity';
import { PrismaService } from './config/prisma/prisma.service';
import { ConfigModule } from './config';

@Module({
  imports: [ConfigModule],
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
