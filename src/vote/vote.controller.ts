import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUserDto } from 'src/posts/dto';

// custom decorator
import { RequestHeaders } from 'src/utils/requestHeader.decorator';

//dto
import { VoteService } from './vote.service';
import { VoteDto } from './dto';

@Controller('vote')
export class VoteController {

    constructor(private voteService : VoteService ){}

    @Post()
    addOrRemoveVote(@RequestHeaders() currentUser: CurrentUserDto , @Body() vote : VoteDto){
        return this.voteService.addOrRemoveVote(currentUser , vote)
    }

}
