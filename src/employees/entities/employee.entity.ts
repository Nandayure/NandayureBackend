import { DriveFolder } from 'src/drive-folder/entities/drive-folder.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { JobPosition } from 'src/job-positions/entities/job-position.entity';
import { MaritalStatus } from 'src/marital-status/entities/marital-status.entity';
import { Request } from 'src/requests/entities/request.entity';
import { Study } from 'src/studies/entities/study.entity';
import { Training } from 'src/trainings/entities/training.entity';
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: string;

  @Column()
  Name: string;

  @Column()
  Surname1: string;

  @Column()
  Surname2: string;

  @Column()
  Birthdate: Date;

  @Column()
  HiringDate: Date;

  @Column()
  Email: string;

  @Column()
  CellPhone: string;

  @Column()
  NumberChlidren: number;

  @Column()
  AvailableVacationDays: number;

  //por el momento es opcional
  @Column({ nullable: true })
  JobPositionId: number;

  @Column()
  GenderId: number;

  @Column()
  MaritalStatusId: number;

  @OneToOne(() => User, (user) => user.Employee, { cascade: ['soft-remove'] })
  User: User;

  @OneToOne(() => DriveFolder, (DriveFolder) => DriveFolder.Employee, {
    cascade: ['soft-remove'],
  })
  DriveFolder: DriveFolder;

  @ManyToOne(() => MaritalStatus, (maritalStatus) => maritalStatus.employees)
  @JoinColumn({ name: 'MaritalStatusId' })
  MaritalStatus: MaritalStatus;

  @ManyToOne(() => Gender, (gender) => gender.employees)
  @JoinColumn({ name: 'GenderId' })
  Gender: Gender;

  //relacion marcada como opcional para etapa de desarrrollo
  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.Employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'JobPositionId' })
  JobPosition: JobPosition;

  @ManyToMany(() => Training, (training) => training.employees)
  @JoinTable({ name: 'employee_training' })
  trainings: Training[];

  @ManyToMany(() => Study, (study) => study.Employees)
  @JoinTable({ name: 'employee_studies' })
  Studies: Study[];

  @OneToMany(() => Request, (request) => request.Employee, {
    cascade: ['soft-remove'],
  })
  requests: Request[];

  @DeleteDateColumn()
  deletedAt?: Date;
  length: number;

  // future relations
}
