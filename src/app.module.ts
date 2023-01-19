import { Module } from '@nestjs/common';

//env
import { ConfigModule } from '@nestjs/config';

//type orm
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// modules
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VoteModule } from './vote/vote.module';

//entities
import { Posts } from './entities/posts.entities';
import { Users } from './entities/user.entities';
import { Votes } from './entities/votes.entities';

@Module({
  imports: [
    ConfigModule.forRoot(), //env configured
    TypeOrmModule.forRoot(new AppModule().config), //configure database with typeORM
    PostsModule, UsersModule, AuthModule, VoteModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // type orm configurations
  config: TypeOrmModuleOptions = {  
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Posts , Users , Votes],
    synchronize: true,
  };
}
