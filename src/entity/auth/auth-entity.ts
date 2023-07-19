import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { NewUser, UserRegister, UserCorrect, SearchByEmail, SearchByToken } from 'src/interface';

@Injectable()
export class AuthEntity {
  constructor(private prisma: PrismaService) {}
  async searchByToken(token: string): Promise<SearchByToken | null> {
    try {
      const authUser = await this.prisma.auth.findFirst({
        where: {
          token: token,
        },
      });
      return authUser;
    } catch (err: any) {
      throw new Error("db not found");
    }
  }
  async putUserInDB(email: string, token: string): Promise<void> {
    try {
      await this.prisma.login.create({
        data: {
          email: email,
          isLogged: false,
          isValidAccount: true,
        },
      });
    } catch (e: any) {
      throw new Error("db not found");
    }
  }
  async searchByEmail(email: string): Promise<SearchByEmail | null> {
    const authUser = await this.prisma.auth.findFirst({
      where: {
        email: email,
      },
    });
    return authUser;
  }
  async deleteOldToken(id: number) {
    try {
      await this.prisma.auth.delete({
        where: {
          id: id,
        },
      });
    } catch (err: any) {
      throw new Error("db not found");
    }
  }
  async searchByEmailForToken(email: string): Promise<SearchByToken | null> {
    try {
      const authUser = await this.prisma.auth.findFirst({
        where: {
          email: email,
        },
      });
      return authUser;
    } catch (err: any) {
      throw new Error("db not found");
    }
  }
  async searchUser(email: string): Promise<any | null> {
    return await this.prisma.register.findFirst({
      where: {
        email: email,
      },
    });
  }
  async tokenPutInDB(email: string, token: string) {
    try {
      const user = await this.prisma.auth.findFirst({
        where: { email: email },
      });
      if (user) {
        await this.prisma.auth.delete({
          where: {
            id: user.id,
          },
        });
        await this.prisma.auth.create({
          data: {
            email: email,
            token: token,
          },
        });
        return;
      }
      throw new Error("user not exist");
    } catch (e: any) {
      throw new Error("db not found");
    }
  }
}
