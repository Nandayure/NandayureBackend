import { Expose } from 'class-transformer';

export class RequestTypeDto {
  @Expose()
  name: string;

  @Expose()
  total: number;

  @Expose()
  percentage: number;
}
