import { DepartmentProgram } from 'src/department-programs/entities/department-program.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { JobPosition } from 'src/job-positions/entities/job-position.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  departmentProgramId: number;

  @Column({ nullable: true })
  departmentHeadId: string;

  @ManyToOne(
    () => DepartmentProgram,
    (departmentProgram) => departmentProgram.Departments,
  )
  @JoinColumn({ name: 'departmentProgramId' })
  departmentProgram: DepartmentProgram;

  @OneToMany(() => JobPosition, (jobPosition) => jobPosition.Department)
  JobPosition: JobPosition[];

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'departmentHeadId' })
  departmentHead: Employee;
  length: number;
}
