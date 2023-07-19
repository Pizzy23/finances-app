import { Controller, Post, Put, Delete } from '@nestjs/common';
import { RegisterService } from '../../services/register/registerService';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StringResDTO } from 'src/dto/response/response-dto';

@ApiTags('Register')
@Controller('/register')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Register New User',
  })
  @Post('')
  async postRegister(input: any) {
    return await this.service.postService(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Change Password',
  })
  @Put('/password')
  async putPassword(input: any) {
    return await this.service.changePassword(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Change E-mail',
  })
  @Put('/email')
  async putEmail(input: any) {
    return this.service.changeEmail(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Delete Account',
  })
  @Delete('')
  async deleteAccount(input: any) {
    return await this.service.deleteAccount(input);
  }
}
