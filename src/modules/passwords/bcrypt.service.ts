import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PasswordService } from './password.service';

@Injectable()
export class BcryptService extends PasswordService {
  async compare(rawPassword: string, hashedPassword: string) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
  async hash(password: string) {
    return await bcrypt.hash(password, 8);
  }
}
