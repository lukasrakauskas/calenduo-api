import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsAlphanumeric()
  @MinLength(3)
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isHidden: boolean;
}
