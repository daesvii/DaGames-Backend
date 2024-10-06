import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 40 })
  firstName: string;

  @Column({ type: 'varchar', length: 40 })
  lastName: string;

  @Column({ type: 'varchar', length: 70, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  documentNumber: string;
}
