import { AbstractDto } from 'src/common/dto/abstract.dto';

export class UserDto extends AbstractDto {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
