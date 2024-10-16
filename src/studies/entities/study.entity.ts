import { Employee } from 'src/employees/entities/employee.entity';
import { StudiesCategory } from 'src/studies-category/entities/studies-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Study {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  StudyCategoryId: string;

  @ManyToOne(
    () => StudiesCategory,
    (studiesCategory) => studiesCategory.Studies,
  )
  @JoinColumn({ name: 'StudyCategoryId' })
  StudiesCategory: StudiesCategory;

  @ManyToMany(() => Employee, (employee) => employee.Studies)
  Employees: Employee[];
}
