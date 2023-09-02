import { Headers, Controller, Get, Post, Put, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PutLogin, PutLogout } from 'src/view';
import { StringResDTO } from 'src/view';
import { StringRes } from 'src/view';
import { LoginService } from '../../services';

@ApiTags('Login')
@Controller('/')
export class LoginController {
  constructor(private readonly service: LoginService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Login user by e-mail',
  })
  @Put('/login')
  async loanGet(@Body() putLogin: PutLogin): Promise<StringRes> {
    return this.service.putLogin(putLogin);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Logout user by e-mail',
  })
  @Put('/logout')
  async logoutUser(@Body() putLogout: PutLogout): Promise<StringRes> {
    return this.service.putLogout(putLogout);
  }
}
