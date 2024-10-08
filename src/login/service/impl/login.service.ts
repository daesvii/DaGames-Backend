import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginService } from '../interface/login.service.interface';
import { LoginRequestDto } from 'src/login/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(userData: LoginRequestDto): Promise<{ username: string }> {
    const user = await this.findUser(userData);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const isPasswordValid = await this.verifyPassword(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
    return { username: user.username };
  }

  private async findUser(userData: LoginRequestDto): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.username }],
    });
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
