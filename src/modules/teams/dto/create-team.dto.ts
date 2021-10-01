import { IsAlphanumeric, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsAlphanumeric()
  @IsString()
  slug: string;
}
