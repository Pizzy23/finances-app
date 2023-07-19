import { BaseService } from '../base/baseService';
import { LoginEntity } from '../../entity';

import {
  UserCorrect,
  UserSearchInRegister,
} from '../../interface/user/userInterface';
import { PutLogout } from 'src/dto/login/login-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService extends BaseService {
  constructor(
    private readonly repository: LoginEntity,
  ) {
    super();
  }
  async putLogin(request: UserSearchInRegister) {
    let firstTime: boolean = false;

    let loginUser = await this.repository.userExistLoginBase(request.email);
    if (loginUser?.isValidAccount == false) {
      throw new Error('User not valid');
    }
    if (!loginUser) {
      loginUser = await this.repository.firstLogin(request.email);
      firstTime = true;
    }
    const user = await this.repository.searchByEmail(request.email);
    const emailValid = super.emailValidate(request.email);
    if (!loginUser) {
      throw new Error('db not found');
    }
    if (emailValid) {
      const compare = await super.compare(request.password, user.password);
      const logged = await this.repository.userExistLoginBase(request.email);
      const id = logged?.id;
      if (
        (compare && firstTime == true) ||
        (compare && logged?.isLogged == false)
      ) {
        await this.repository.userLogged(request.email, id);
        return { res: 'Usuario logado', status: 200 };
      }
      if (logged?.isLogged == true) {
        console.log(logged);
        throw new Error('User is logged');
      }
      throw new Error('password not match');
    }
    throw new Error('email not valid');
  }
  catch(e: any) {
    throw new Error(e);
  }
  async putLogout(email: PutLogout) {
    const emailValid = super.emailValidate(email.email);
    if (!emailValid) return { res: 'E-mail invalido', status: 404 };
    const user = await this.repository.userExistLoginBase(email.email);
    if (user !== null) {
      if (user.isLogged == true) {
        await this.repository.userDelete(email.email, user.id);
        return { res: 'Usuario deslogado', status: 200 };
      }
    }
  }
  async getUser(email: string): Promise<UserCorrect> {
    try {
      const user = await this.repository.searchByEmail(email);
      if (user) {
        return user;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
