import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetFilesFilterDto {
  @IsOptional()
  @IsString()
  pageToken?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], {
    message: 'orderDirection debe ser "asc" o "desc"',
  })
  orderDirection?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @IsIn(['modifiedTime', 'name', 'createdTime'], {
    message: 'orderBy debe ser "modifiedTime", "name" o "createdTime"',
  })
  orderBy?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
