import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate } from 'typeorm';
import * as crypto from 'crypto';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: ''})
  avatar: string;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password: string;

  @Column()
  created_at: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date();
  }
  @Column()
  updated_at: Date;
}