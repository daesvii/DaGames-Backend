import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './service/impl/login.service';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { LoginController } from './controller/login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
