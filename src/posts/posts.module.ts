import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entities';
import { Users } from 'src/entities/user.entities';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts , Users])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
