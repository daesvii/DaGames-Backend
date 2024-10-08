import { Controller, Post, Body } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.dto';
import { LoginService } from '../service/impl/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('')
  async login(@Body() loginDto: LoginRequestDto) {
    const { username } = await this.loginService.login(loginDto);
    return { username };
  }
}
