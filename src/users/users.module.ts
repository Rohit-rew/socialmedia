import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
