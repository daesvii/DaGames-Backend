import { Injectable, ConflictException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/register/dto/register.dto';
import { IRegisterService } from '../interface/register.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: RegisterRequestDto): Promise<RegisterResponseDto> {
    await this.checkForExistingUser(userData);

    const hashedPassword = await this.hashPassword(userData.password);
    const user = this.mapToUser(userData, hashedPassword);
    const savedUser = await this.userRepository.save(user);

    return this.mapToUserResponse(savedUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private mapToUser(
    userData: RegisterRequestDto,
    hashedPassword: string,
  ): User {
    const user = new User();
    Object.assign(user, userData);
    user.password = hashedPassword;
    return user;
  }

  private async checkForExistingUser(
    userData: RegisterRequestDto,
  ): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: userData.username },
        { email: userData.email },
        { phoneNumber: userData.phoneNumber },
        { documentNumber: userData.documentNumber },
      ],
    });

    if (existingUser) {
      this.throwConflictException(existingUser, userData);
    }
  }

  private throwConflictException(
    existingUser: User,
    userData: RegisterRequestDto,
  ): void {
    if (existingUser.username === userData.username) {
      throw new ConflictException('El nombre de usuario ya está en uso.');
    }
    if (existingUser.email === userData.email) {
      throw new ConflictException('El correo electrónico ya está en uso.');
    }
    if (existingUser.phoneNumber === userData.phoneNumber) {
      throw new ConflictException('El número de teléfono ya está en uso.');
    }
    if (existingUser.documentNumber === userData.documentNumber) {
      throw new ConflictException('El número de documento ya está en uso.');
    }
  }

  private mapToUserResponse(user: User): RegisterResponseDto {
    const {
      id,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      documentNumber,
    } = user;
    return {
      id,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      documentNumber,
    };
  }
}
