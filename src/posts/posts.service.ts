import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entities';
import { Votes } from 'src/entities/votes.entities';
import { Repository } from 'typeorm';

import { CreatePostDto, CurrentUserDto, updatePostDto } from './dto';
import { postResponse } from './type';

import {Users} from "../entities/user.entities"
import { Exclude } from 'class-transformer';
import { response } from 'express';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepo: Repository<Posts> , @InjectRepository(Users) private userRepo: Repository<Users>) {}

  createPost(post: CreatePostDto, currentUser: CurrentUserDto) {
    const newPost = this.postRepo.create({ ...post, owner: currentUser });
    return this.postRepo.save(newPost);
  }

  async getAllPosts() {
    const posts = await this.postRepo.find({ relations: { owner: true , votes : true }  });
    let allPosts = []
    class Response {
      constructor(post : postResponse){
        Object.assign(this , {...post , votes : post.votes.length})
      }
    }
    for (let i in posts){
      allPosts.push(new Response(posts[i]))
    }
    return allPosts
  }

  async getPostById(id: string) {
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

  async deletePostById(id: string, currentUser: CurrentUserDto) {
    const post = await this.postRepo.findOne({
      where: { id: id },
      relations: { owner: true },
    });
    if (!post)
      throw new HttpException(
        `post with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    if (post.owner.id != currentUser.id)
      throw new HttpException(`Unauthorized attempt`, HttpStatus.UNAUTHORIZED);
    const deletedPost = await this.postRepo.delete({ id: id });
    if (deletedPost.affected != 1)
      throw new HttpException(
        `could not delete post with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return post;
  }

  async updatePostById(
    id: string,
    currentUser: CurrentUserDto,
    updatePost: updatePostDto,
  ) {
    const post = await this.getPostById(id);
    if (post.owner.id != currentUser.id)
      throw new HttpException(`Unauthorized attempt`, HttpStatus.UNAUTHORIZED);

    const updatedPost = await this.postRepo.update({ id: post.id }, updatePost);
    if(updatedPost.affected !==1) throw new HttpException(
        `could not delete post with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return this.getPostById(id)
  }
}



// const posts = await this.postRepo.createQueryBuilder("posts").select("posts.* , COUNT(votes.post_id)" , "total_votes").leftJoinAndSelect('posts.owner' , 'users').leftJoin('posts.votes' , 'votes').groupBy(" posts.id , users.id ").execute()
//     console.log(posts)