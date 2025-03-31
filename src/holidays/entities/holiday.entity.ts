import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  // Para feriados no recurrentes (fecha específica con año)
  @Column({ type: 'date', nullable: true })
  specificDate: Date | null;

  // Para feriados recurrentes (mes y día sin importar año)
  @Column({ type: 'int', nullable: true })
  recurringMonth: number | null;

  @Column({ type: 'int', nullable: true })
  recurringDay: number | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isRecurringYearly: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
