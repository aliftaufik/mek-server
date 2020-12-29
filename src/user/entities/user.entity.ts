import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 25,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  constructor(fields?: { username: string; email: string; password: string }) {
    super();
    if (fields) {
      const { username, email, password } = fields;
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }
}
