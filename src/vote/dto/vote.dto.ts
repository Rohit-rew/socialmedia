import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import {
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { isDeepStrictEqual } from 'util';

export class VoteDto {
  @IsUUID()
  postId: string;

  @ValidateIf((o) => {
    if (o.dir != 1 && o.dir != 0) {
      throw new HttpException(
        'please provide a value of 0 or 1',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  })
  @IsNotEmpty()
  dir: number;
}
