import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';

@Entity()
export class RequestSalaryCertificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ unique: true })
  RequestId: number;

  @OneToOne(() => Request, (request) => request.RequestVacation)
  @JoinColumn({ name: 'RequestId' })
  Request: Request;
}
