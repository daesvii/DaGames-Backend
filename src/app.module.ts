import { RegisterModule } from './register/register.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './register/entity/user.entity';
import { dbConfig } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [User],
      synchronize: true,
    }),
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
