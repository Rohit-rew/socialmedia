import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votes } from 'src/entities/votes.entities';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports : [TypeOrmModule.forFeature([Votes])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
