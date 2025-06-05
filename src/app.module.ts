import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSourceOptions), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
