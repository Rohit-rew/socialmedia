import { UUIDVersion } from "class-validator";
import { Token } from "src/auth/dto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entities";


export class Owner {
    email : string
    id : string 
}

@Entity({name : 'posts'})
export class Posts {

    @PrimaryGeneratedColumn({primaryKeyConstraintName : 'pk_post_id'})
    id : number;

    @Column({length : 50})
    title : string;

    @Column({type : 'text'})
    description: string;

    @CreateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(()=>Users , users=>users.posts)
    @JoinColumn({name : 'owner' ,referencedColumnName : 'id'})
    owner : Owner 
} 