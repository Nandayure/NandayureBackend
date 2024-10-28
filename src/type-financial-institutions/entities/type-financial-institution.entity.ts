import { FinancialInstitution } from 'src/financial-institutions/entities/financial-institution.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeFinancialInstitution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => FinancialInstitution,
    (financialInstitution) => financialInstitution.TypeFinancialInstitution,
  )
  FinancialInstitutions: FinancialInstitution[];
  length: number;
}
