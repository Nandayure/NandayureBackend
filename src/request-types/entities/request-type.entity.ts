import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';

@Entity()
export class RequestType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Request, (request) => request.RequestType)
  requests: Request[];
}
