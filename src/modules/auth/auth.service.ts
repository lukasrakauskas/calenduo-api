import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    return user
      ? {
          access_token: this.jwtService.sign(user),
        }
      : {};
  }

  //TODO: validate logic should be here
  async validateUser(loginDto: LoginDto): Promise<User | undefined> {
    const { email, password } = loginDto;
    return await this.usersService.validatePassword(email, password);
  }
}
