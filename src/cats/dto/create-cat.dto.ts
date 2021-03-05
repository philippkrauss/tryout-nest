import { IsString, IsInt, IsEmpty, IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  breed: string;
}
