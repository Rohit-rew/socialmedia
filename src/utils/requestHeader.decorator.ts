import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';


import { JwtService } from '@nestjs/jwt';

export const RequestHeaders = createParamDecorator(
  async (property: string | number | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    if (!headers.authorization)
      throw new HttpException('user not logged in', HttpStatus.UNAUTHORIZED);

    const JWTService = new JwtService();

    try {
      const token = (headers.authorization as string)
        .replace('Bearer', '')
        .trim();
      const decodedToken = await JWTService.verifyAsync(token, {
        algorithms: ['HS256'],
        secret: process.env.JWT_SECRET,
      });

      return {
        id : decodedToken.id,
        email : decodedToken.email
      }
    } catch (error) {
      throw new HttpException('Invalid token Please log in again' , HttpStatus.NOT_ACCEPTABLE)
    }

  },
);

