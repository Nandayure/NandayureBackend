import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  payrollGeneratedDate: Date;

  @Column()
  Startperiod: Date;

  @Column()
  EndPeriod: Date;
}
