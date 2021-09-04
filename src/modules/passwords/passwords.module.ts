import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PasswordService } from './password.service';

@Module({
  providers: [{ provide: PasswordService, useClass: BcryptService }],
  exports: [PasswordService],
})
export class PasswordsModule {}
