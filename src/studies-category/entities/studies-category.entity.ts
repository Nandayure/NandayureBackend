import { Study } from 'src/studies/entities/study.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class StudiesCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  Dedication: number;

  @Column()
  Restriction: number;

  @OneToMany(() => Study, (study) => study.StudiesCategory)
  Studies: Study[];
}
