import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request } from '../../requests/entities/request.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity()
export class RequestApproval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  approverId: string;

  @ManyToOne(() => Employee, { eager: false })
  @JoinColumn({ name: 'approverId' })
  approver: Employee;

  // @Column()
  // Name: string;

  // @Column()
  // Surname1: string;

  // @Column()
  // Surname2: string;

  @Column()
  requesterId: string;

  @ManyToOne(() => Employee, { eager: false })
  @JoinColumn({ name: 'requesterId' })
  requester: Employee;

  @Column()
  processNumber: number;

  @Column()
  RequestId: number;

  @Column({ nullable: true, default: null })
  observation: string;

  @Column({ nullable: true, default: null })
  approved: boolean;

  @Column({ default: false })
  current: boolean;

  @Column({ nullable: true, default: null })
  ApprovedDate: Date;

  @ManyToOne(() => Request, (request) => request.RequestApprovals)
  @JoinColumn({ name: 'RequestId' })
  Request: Request;
}
