import { Request } from 'src/requests/entities/request.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RequestPaymentConfirmation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ unique: true })
  RequestId: number;

  @OneToOne(() => Request, (request) => request.RequestPaymentConfirmation)
  @JoinColumn({ name: 'RequestId' })
  Request: Request;

  @DeleteDateColumn()
  deletedAt?: Date;
}
