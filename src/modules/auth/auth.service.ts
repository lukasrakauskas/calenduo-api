import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';

import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { PasswordService } from '../passwords/password.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  // TODO: needs updating
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    if (!user) return {};

    const userDto = classToPlain(user);

    return {
      access_token: this.jwtService.sign(userDto),
    };
  }

  async validateUser({ email, password }: LoginDto): Promise<User | undefined> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.passwordService.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
