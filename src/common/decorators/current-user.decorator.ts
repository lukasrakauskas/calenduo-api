import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

interface CurrentUserOptions {
  required?: boolean;
}

export const CurrentUser = createParamDecorator(
  (options: CurrentUserOptions = {}, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    if (options.required && !user) {
      throw new UnauthorizedException();
    }

    return user;
  },
);
