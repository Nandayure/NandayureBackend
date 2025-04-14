import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class JobPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  DepartmentId: number;

  @OneToMany(() => Employee, (employee) => employee.JobPosition)
  Employees: Employee;

  //relacion marcada como opcional para etapa de desarrrollo
  @ManyToOne(() => Department, (department) => department.JobPosition)
  @JoinColumn({ name: 'DepartmentId' })
  Department: Department;
}
