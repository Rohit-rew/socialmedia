import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Posts } from "./posts.entities";
import { Users } from "./user.entities";


@Entity()
export class Votes {

    @PrimaryColumn('uuid')
    post_id : string

    @PrimaryColumn('uuid')
    owner_id : string

    @ManyToOne(()=> Posts , post=>post.id , {nullable : false } )
    @JoinColumn({name : "post_id"})
    posts : Posts
    
    @ManyToOne(()=>Users , user=>user.id , {nullable : false })
    @JoinColumn({name : "owner_id"})
    owner : Users
} 
 