import { Injectable, ConflictException } from '@nestjs/common';
import { User } from 'src/register/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/register/dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: RegisterRequestDto): Promise<RegisterResponseDto> {
    await this.checkForExistingUser(userData);

    const user = this.mapToUser(userData);
    const savedUser = await this.userRepository.save(user);

    return this.mapToUserResponse(savedUser);
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

  private mapToUser(userData: RegisterRequestDto): User {
    const user = new User();
    Object.assign(user, userData);
    return user;
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
