import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entities';
import { Repository } from 'typeorm';

import { CreatePostDto, CurrentUserDto } from './dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepo: Repository<Posts>) {}

  createPost(post: CreatePostDto, currentUser: CurrentUserDto) {
    const newPost = this.postRepo.create({ ...post, owner: currentUser });
    return this.postRepo.save(newPost);
  }

  getAllPosts() {
    return this.postRepo.find({ relations: { owner: true } });
  }

  async getPostById(id: number) {
    const post = await this.postRepo.findOne({
      where: { id: id },
      relations: { owner: true },
    });
    if (!post)
      throw new HttpException(
        `post with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return post;
  }

  async deletePostById(id: number, currentUser: CurrentUserDto) {
    const post = await this.postRepo.findOne({
      where: { id: id },
      relations: { owner: true },
    });
    if (!post)
      throw new HttpException(
        `post with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    if(post.owner.id != currentUser.id) throw new HttpException(
        `Unauthorized attempt`,
        HttpStatus.UNAUTHORIZED,
    );
    const deletedPost = await this.postRepo.delete({id : id})
    if(deletedPost.affected != 1) throw new HttpException(
        `could not delete post with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
    );
    return post

  }
}
