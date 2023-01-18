import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

//dto=>      in                out
import { CreateuserDto, UserResponse, DeleteUserDto } from './dto';
import { RequestHeaders } from 'src/utils/requestHeader.decorator';
import { CurrentUserDto } from 'src/posts/dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // create new user
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user: CreateuserDto): Promise<UserResponse> {
    const userObject = await this.usersService.createNewuser(user);
    return new UserResponse(userObject);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(
    @RequestHeaders() currentuser: CurrentUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponse> {
    const userObject = await this.usersService.getuserById(id);
    return new UserResponse(userObject);
  }

  // delete user id will be extracted from token from headers
  @Delete()
  deleteUser(
    @RequestHeaders() currentuser: CurrentUserDto,
    @Body() user: DeleteUserDto,
  ) {
    return this.usersService.deleteUserById(user.id);
  }
}
