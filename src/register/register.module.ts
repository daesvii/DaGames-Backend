import { RegisterService } from './service/impl/register.service';
import { RegisterController } from './controller/register.controller';

import { Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
