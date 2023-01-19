import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Votes } from 'src/entities/votes.entities';
import { CurrentUserDto } from 'src/posts/dto';
import { Repository } from 'typeorm';
import { VoteDto } from './dto';

@Injectable()
export class VoteService {
    constructor(@InjectRepository(Votes) private votesRepo : Repository<Votes>){}

    async addOrRemoveVote(currentUser : CurrentUserDto , vote : VoteDto){

        if(vote.dir==1){ // add a vote

            const existingVote = await this.votesRepo.findOne({where : {owner_id : currentUser.id , post_id : vote.postId}})
            if(existingVote)throw new HttpException("vote already existed" , HttpStatus.BAD_REQUEST)

            const voteObject = this.votesRepo.create({owner_id : currentUser.id , post_id : vote.postId })
            return this.votesRepo.save(voteObject)

        }else{ // detete a vote

            const existingVote = await this.votesRepo.findOne({where : {owner_id : currentUser.id , post_id : vote.postId}})
            if(!existingVote)throw new HttpException("vote does not exist" , HttpStatus.BAD_REQUEST)

            return this.votesRepo.delete({owner_id : currentUser.id , post_id : vote.postId})
        }

    }
}
 