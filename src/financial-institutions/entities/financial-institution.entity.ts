import { Employee } from 'src/employees/entities/employee.entity';
import { TypeFinancialInstitution } from 'src/type-financial-institutions/entities/type-financial-institution.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FinancialInstitution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TypeFinancialInstitutionId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  deductionPercentage: number;

  @ManyToOne(
    () => TypeFinancialInstitution,
    (typeFinancialInstitution) =>
      typeFinancialInstitution.FinancialInstitutions,
  )
  @JoinColumn({ name: 'TypeFinancialInstitutionId' })
  TypeFinancialInstitution: TypeFinancialInstitution;

  @ManyToMany(() => Employee, (employee) => employee.FinancialInstitutions)
  Employees: Employee[];
}
