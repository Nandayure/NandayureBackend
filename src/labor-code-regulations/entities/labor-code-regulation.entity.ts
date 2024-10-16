import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LaborCodeRegulation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 11, scale: 2, nullable: true })
  minimumAmount: number;

  @Column('decimal', { precision: 11, scale: 2, nullable: true })
  maximumAmount: number;

  @Column()
  percentage: number;

  @Column({ nullable: true })
  description: string;
}
