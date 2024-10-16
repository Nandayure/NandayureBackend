import { Exclude } from 'class-transformer';
import { Employee } from 'src/employees/entities/employee.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  //PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  @Exclude()
  Password: string;

  @OneToOne(() => Employee, (employee) => employee.User)
  @JoinColumn({ name: 'id' })
  Employee: Employee;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  Roles: Role[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
