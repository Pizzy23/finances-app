import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthEntity, LoginEntity, RegisterEntity } from '../entity/';

@Module({
  providers: [PrismaService, LoginEntity, RegisterEntity, AuthEntity],
  exports: [PrismaService, LoginEntity, RegisterEntity, AuthEntity],
})
export class PrismaModule {}
