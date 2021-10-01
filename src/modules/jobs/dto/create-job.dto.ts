import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  hourlyRate: number;
}
