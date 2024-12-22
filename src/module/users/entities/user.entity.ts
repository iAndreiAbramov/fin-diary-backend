import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'now()', nullable: true })
  updatedAt: Date;
}
