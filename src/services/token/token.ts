import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import { AuthEntity } from 'src/entity';

@Injectable()
export class TokenService extends BaseService {
  constructor(private repository: AuthEntity) {
    super();
  }
  private async newCreateToken(email: string): Promise<string> {
    const token = super.tokenGenerator();
    const user = await this.repository.searchByEmailForToken(email);
    if (user) {
      await this.repository.deleteOldToken(user.id);
    }
    if (await this.repository.searchByToken(token))
      await this.newCreateToken(email);
    return token;
  }
  async newSendToken(email: string) {
    const token = await this.newCreateToken(email);
    const txt = `Prezado(a) usuário(a),

    Esperamos que esta mensagem encontre você cheio de motivação e determinação para alcançar suas metas financeiras! Temos o prazer de informar que geramos um novo token exclusivo para você. Anote-o em um local seguro:
    
    Novo Token:${token}`;
    const subject = 'Novo Token de Acesso';
    super.sendMail(email, txt, subject);
    return { res: 'Novo Token enviado', status: 200 };
  }
}
