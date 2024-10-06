import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../service/impl/register.service';
import { RegisterRequestDto, RegisterResponseDto } from '../dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  createUser(
    @Body() userData: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.registerService.createUser(userData);
  }
}
