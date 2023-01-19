import { UUIDVersion } from 'class-validator';
import { Token } from 'src/auth/dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entities';
import { Votes } from './votes.entities';

export class Owner {
  email: string;
  id: string;
}

@Entity({ name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_post_id' })
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Users, (users) => users.posts , {nullable : false})
  @JoinColumn({ name: 'owner', referencedColumnName: 'id' })
  owner: Owner;

  @OneToMany(()=>Votes , vote=>vote.posts)
  votes : Votes[]
}
