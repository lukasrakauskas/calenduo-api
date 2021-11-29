import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Exception extends HttpException {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;
}
