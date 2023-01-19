import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

// dto imports
import { CreateuserDto, DeleteUserDto } from './dto';

//jwt
import { JwtService } from '@nestjs/jwt';

//bcrypt
import * as bcrypt from 'bcrypt'
import { Posts } from 'src/entities/posts.entities';
import { CurrentUserDto } from 'src/posts/dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepo : Repository<Users>){}

    // creates new user
    async createNewuser(user : CreateuserDto){
        // check for existing user
        const existinguser = await this.usersRepo.findOne({where : {email : user.email}})
        if(existinguser) throw new HttpException("Email already exists" , HttpStatus.BAD_REQUEST)

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(user.password , salt)
        user.password = hashedpassword

        //create the user
        const newUser = this.usersRepo.create(user)
        return this.usersRepo.save(newUser)
    }

    async getuserById(id : string): Promise<Users> {
        const user = await this.usersRepo.findOne({ relations : {posts : true},where : {id : id}})
        if(!user) throw new HttpException("user not found" , HttpStatus.NOT_FOUND)
        return user
    }

    // deletes esisting user
    async deleteUser(currentuser : CurrentUserDto , user : DeleteUserDto){
        const existingUser = await this.usersRepo.findOne({where : {id : currentuser.id}})
        if(!existingUser) throw new HttpException("user does not exist" , HttpStatus.NOT_FOUND)
        if(existingUser.id != currentuser.id) throw new HttpException("Not authorised" , HttpStatus.UNAUTHORIZED)
        console.log(existingUser)
        const isVallidPass = await bcrypt.compare(user.password,existingUser.password)
        if(!isVallidPass) throw new HttpException("invalid password" , HttpStatus.UNAUTHORIZED)
        return  {success : true , message  :"user deleted"}
    }

}
