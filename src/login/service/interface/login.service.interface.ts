import { LoginRequestDto } from 'src/login/dto/login.dto';

export interface ILoginService {
  login(userData: LoginRequestDto): Promise<boolean>;
}
