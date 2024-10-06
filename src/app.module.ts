import { RegisterModule } from './register/register.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
