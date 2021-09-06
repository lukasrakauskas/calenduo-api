import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty()
  title: string;

  @IsAlphanumeric()
  @MinLength(3)
  slug: string;

  @IsOptional()
  description: string;

  @IsOptional()
  isHidden: boolean;
}
