import { RegisterRequestDto } from 'src/register/dto/register.dto';
import { User } from 'src/register/entity/user.entity';

export interface IRegisterService {
  createUser(userData: RegisterRequestDto): Promise<User>;
}
