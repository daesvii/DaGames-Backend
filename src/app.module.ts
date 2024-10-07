import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { dbConfig } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [User],
      synchronize: true,
    }),
    RegisterModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
