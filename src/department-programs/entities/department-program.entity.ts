import { Department } from 'src/departments/entities/department.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DepartmentProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Department, (department) => department.departmentProgram)
  Departments: Department[];
}
