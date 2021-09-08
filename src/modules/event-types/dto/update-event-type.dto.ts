import { PartialType } from '@nestjs/swagger';
import { IsAlphanumeric, IsOptional, MinLength } from 'class-validator';
import { CreateEventTypeDto } from './create-event-type.dto';

export class UpdateEventTypeDto extends PartialType(CreateEventTypeDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsAlphanumeric()
  @MinLength(3)
  slug?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isHidden?: boolean;
}
