import { Department } from 'src/departments/entities/department.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BudgetCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  CodSalary: string;

  @Column({ nullable: true })
  CodExtra: string;

  @Column({ nullable: true })
  CodAnuity: string;

  @Column({ nullable: true })
  CodSalaryPlus: string;

  @OneToMany(() => Department, (department) => department.BudgetCode)
  Department: Department[];
}
