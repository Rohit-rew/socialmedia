import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import {RequestHeaders} from "../utils/requestHeader.decorator"

// DTO
import { CreatePostDto, CurrentUserDto } from './dto';


@Controller('posts')
export class PostsController {

    constructor(private postService : PostsService){}

    @Post()
    async createPost(@RequestHeaders() currentUser: CurrentUserDto , @Body() post : CreatePostDto){
        return await this.postService.createPost(post , currentUser)
    }

    @Get()
    async getPosts(@RequestHeaders() currentUser: CurrentUserDto){
        return await this.postService.getAllPosts()  
    }

    @Get(':id')
    async getOnePost(@RequestHeaders() currentUser: CurrentUserDto , @Param('id' , ParseIntPipe) id : number){
        return await this.postService.getPostById(id)
    }

    @Delete(':id')
    async deletePost(@RequestHeaders() currentUser: CurrentUserDto , @Param('id' , ParseIntPipe) id : number){
        return await this.postService.deletePostById(id , currentUser)
    }

}
