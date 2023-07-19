import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { NewUser, UserRegister, UserCorrect } from 'src/interface';

@Injectable()
export class RegisterEntity {
  constructor(private prisma: PrismaService) {}
  async registerUser(user: NewUser): Promise<UserRegister> {
    try {
      const newUser = await this.prisma.register.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
      if (user.token) {
        await this.prisma.auth.create({
          data: {
            email: user.email,
            token: user.token,
          },
        });
      }
      return newUser;
    } catch (e: any) {
      throw new Error('user Exist');
    }
  }
  async changePassword(user: UserCorrect, newUser: NewUser) {
    try {
      await this.prisma.register.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
    } catch (e: any) {
      throw new Error('db not found');
    }
  }
  async changeEmail(user: UserCorrect, newEmail: string) {
    try {
      await this.prisma.register.delete({
        where: {
          id: user.id,
        },
      });
      await this.prisma.register.create({
        data: {
          name: user.name,
          email: newEmail,
          password: user.password,
        },
      });
    } catch (e: any) {
      throw new Error('db not found');
    }
  }
  async deleteAccount(user: UserCorrect) {
    try {
      await this.prisma.register.delete({
        where: {
          id: user.id,
        },
      });
    } catch (e: any) {
      throw new Error('db not found');
    }
  }
}
