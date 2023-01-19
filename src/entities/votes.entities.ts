import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Posts } from "./posts.entities";


@Entity()
export class Votes {

    @PrimaryColumn('uuid')
    post_id : string

    @PrimaryColumn('uuid')
    owner_id : string
} 
