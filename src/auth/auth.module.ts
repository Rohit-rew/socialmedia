import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

//entities
import { Users } from 'src/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([Users]) , JwtModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
