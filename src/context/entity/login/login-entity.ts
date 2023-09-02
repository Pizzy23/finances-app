import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { UserSearchInRegister, UserLogged, UserBaseLogin } from 'src/view';

@Injectable()
export class LoginEntity {
  constructor(private prisma: PrismaService) {}
  async userExists(
    user: UserSearchInRegister,
  ): Promise<UserSearchInRegister | null> {
    try {
      const loginUser = await this.prisma.register.findFirst({
        where: {
          email: user.email,
        },
      });
      return loginUser;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }

  async searchByEmail(email: string): Promise<UserLogged | null | any> {
    try {
      const loginUser = await this.prisma.register.findFirst({
        where: {
          email: email,
        },
      });
      return loginUser;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }

  async userExistLoginBase(
    email: string,
  ): Promise<UserBaseLogin | null | UserLogged> {
    try {
      const loginUser = await this.prisma.login.findFirst({
        where: {
          email: email,
        },
      });
      return loginUser;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }

  async userLogged(email: string, id: any): Promise<UserLogged> {
    try {
      await this.prisma.login.delete({
        where: { id: id },
      });
      const userLogged = await this.prisma.login.create({
        data: {
          email: email,
          isLogged: true,
          isValidAccount: true,
        },
      });
      return userLogged;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }
  async firstLogin(email: string): Promise<UserLogged | any> {
    try {
      const userLogged = await this.prisma.login.create({
        data: {
          email: email,
          isLogged: true,
          isValidAccount: true,
        },
      });
      return userLogged;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }
  async userDelete(email: string, id: number): Promise<UserLogged> {
    try {
      const userLogout = await this.prisma.login.create({
        data: {
          email: email,
          isLogged: false,
          isValidAccount: true,
        },
      });
      await this.prisma.login.delete({
        where: {
          id: id,
        },
      });
      return userLogout;
    } catch (err: any) {
      throw new Error('db not found');
    }
  }
}
