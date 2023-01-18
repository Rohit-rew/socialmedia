import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { isErrored } from 'stream';
import { Repository } from 'typeorm';

//dto
import { LoginuserDto } from './dto';
//bcrypt
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async loginUser(userData: LoginuserDto) {
    //check id user exists
    const user = await this.userRepo.findOne({
      where: { email: userData.email },
    });
    if (!user) throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    //check if pass is valid
    const isValidPass = await bcrypt.compare(userData.password, user.password);
    if (!isValidPass) throw new HttpException('Invalid password', HttpStatus.NOT_FOUND);

    // create and send JWT
    const jwt = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      { algorithm: 'HS256', expiresIn: '1d', secret: process.env.JWT_SECRET },
    );
    return jwt;
  }
}
