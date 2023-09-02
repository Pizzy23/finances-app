import { Controller, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { RegisterService } from '../../services/register/registerService';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StringResDTO } from 'src/view';
import {
  ChangeEmail,
  ChangePassInput,
  CreateUser,
  EmailInput,
} from 'src/view';

@ApiTags('Register')
@Controller('/register')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Register New User',
  })
  @Post('')
  async postRegister(@Body() input: CreateUser) {
    return await this.service.postService(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Change Password',
  })
  @Put('/password')
  async putPassword(@Headers() input: ChangePassInput) {
    return await this.service.changePassword(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Change E-mail',
  })
  @Put('/email')
  async putEmail(@Headers() input: ChangeEmail) {
    return this.service.changeEmail(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Delete Account',
  })
  @Delete('')
  async deleteAccount(@Headers() input: EmailInput) {
    return await this.service.deleteAccount(input);
  }
}
