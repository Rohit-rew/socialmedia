import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Posts } from "./posts.entities";


@Entity({name : 'users'})
export class Users {

    @PrimaryGeneratedColumn( 'uuid', {primaryKeyConstraintName : 'PK_USER_ID'})
    id : string;

    @Column({unique : true , length : 50})
    email : string
 
    @Column({select  :false})
    password : string

    @OneToMany(()=>Posts , posts=>posts.owner)
    @JoinColumn({name : 'posts'})
    posts  : Posts[]

}