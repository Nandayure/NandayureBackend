import { Expose } from 'class-transformer';

export class RequestStatusDto {
  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  total: number;
}
