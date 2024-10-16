import { Request } from 'src/requests/entities/request.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestsState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @OneToMany(() => Request, (request) => request.RequestStatus)
  requests: Request[];
}
