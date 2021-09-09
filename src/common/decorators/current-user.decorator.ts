import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'typeorm';

type UserKeys = keyof Omit<
  User,
  keyof typeof BaseEntity | 'recover' | 'reload'
>;

export const CurrentUser = createParamDecorator(
  (key: UserKeys | null | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    return key != null ? user[key] : user;
  },
);
