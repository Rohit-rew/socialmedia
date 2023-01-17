import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config : TypeOrmModuleOptions = {
    type : 'postgres',
    host : process.env.DATABASE_HOST,
    port : +process.env.DATABASE_PORT,
    username : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    entities : [],
    synchronize : true
}