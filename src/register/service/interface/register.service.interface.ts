import {
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/register/dto/register.dto';

export interface IRegisterService {
  createUser(userData: RegisterRequestDto): Promise<RegisterResponseDto>;
}
