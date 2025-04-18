import { Employee } from 'src/employees/entities/employee.entity';
import { RequestApproval } from 'src/request-approvals/entities/request-approval.entity';
import { RequestPaymentConfirmation } from 'src/request-payment-confirmations/entities/request-payment-confirmation.entity';
import { RequestSalaryCertificate } from 'src/request-salary-certificates/entities/request-salary-certificate.entity';
import { RequestType } from 'src/request-types/entities/request-type.entity';
import { RequestVacation } from 'src/request-vacation/entities/request-vacation.entity';
import { RequestsState } from 'src/requests-state/entities/requests-state.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'int', default: 1 })
  RequestStateId: number;

  @Column({ type: 'int', nullable: false })
  RequestTypeId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CancelledReason: string;

  @Column()
  EmployeeId: string;

  @ManyToOne(() => RequestsState, (requestState) => requestState.requests)
  @JoinColumn({ name: 'RequestStateId' })
  RequestStatus: RequestsState;

  @ManyToOne(() => RequestType, (requestType) => requestType.requests)
  @JoinColumn({ name: 'RequestTypeId' })
  RequestType: RequestType;

  @ManyToOne(() => Employee, (employee) => employee.requests)
  @JoinColumn({ name: 'EmployeeId' })
  Employee: Employee;

  @OneToOne(
    () => RequestVacation,
    (requestVacation) => requestVacation.Request,
    { nullable: true, cascade: ['soft-remove'] },
  )
  RequestVacation: RequestVacation;

  @OneToOne(
    () => RequestSalaryCertificate,
    (requestSalaryCertificate) => requestSalaryCertificate.Request,
    { nullable: true, cascade: ['soft-remove'] },
  )
  RequestSalaryCertificate: RequestSalaryCertificate;

  @OneToOne(
    () => RequestPaymentConfirmation,
    (requestPaymentConfirmation) => requestPaymentConfirmation.Request,
    { nullable: true, cascade: ['soft-remove'] },
  )
  RequestPaymentConfirmation: RequestPaymentConfirmation;

  @OneToMany(
    () => RequestApproval,
    (requestApproval) => requestApproval.Request,
    { cascade: ['soft-remove'] },
  )
  RequestApprovals: RequestApproval[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
