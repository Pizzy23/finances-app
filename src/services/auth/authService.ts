import { BaseService } from '../base/baseService';
import { AuthEntity } from '../../entity';
import { NewUser } from '../../interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService extends BaseService {
  constructor(private readonly repository: AuthEntity) {
    super();
  }
  private async createToken(email: string): Promise<string> {
    const token = super.tokenGenerator();
    const user = await this.repository.searchByToken(token);
    if (user) return this.createToken(email);
    return token;
  }

  async postToken(user: NewUser): Promise<Object> {
    try {
      const txt = `Prezado(a) usuário(a),

      Esperamos que esta mensagem encontre você cheio de motivação e determinação para alcançar suas metas financeiras! Temos o prazer de informar que você tem algumas horas para utilizar o seu token exclusivo: ${user.token}`;
      const subject = 'Token de Acesso';
      super.sendMail(user.email, txt, subject);
      return { res: 'Token Enviado', status: 200 };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getUserAuth(token: string): Promise<Object | null> {
    try {
      const user = await this.repository.searchByToken(token);
      if (user?.token == token) {
        await this.repository.putUserInDB(user.email, token);
        return { res: 'Token Valido', status: 200 };
      }
      throw new Error('Token not Valid');
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async changePassword(user: NewUser): Promise<Object> {
    try {
      const userInDb = await this.repository.searchUser(user.email);
      if (userInDb == null) {
        throw new Error('user not exist');
      }
      const token = super.tokenGenerator();
      const txt = `Prezado(a) usuário(a),
      Temos o prazer de informar que você tem algumas horas para utilizar o seu token exclusivo para troca de senha: ${token}`;
      const subject = 'Token de Acesso';
      super.sendMail(user.email, txt, subject);
      await this.repository.tokenPutInDB(user.email, token);
      return { res: 'Token Enviado', status: 200 };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
