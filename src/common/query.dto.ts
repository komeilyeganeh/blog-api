import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsIn(['name', 'age', 'email'])
  @IsOptional()
  search?: string;

  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: string;

  @IsString()
  @IsOptional()
  sort?: string;
}
