import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttendanceStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @OneToMany(() => Attendance, (attendance) => attendance.attendanceStatus)
  attendance: Attendance[];
}
