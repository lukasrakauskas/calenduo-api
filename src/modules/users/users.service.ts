import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/modules/passwords/password.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const emailInUse = await this.findByEmail(createUserDto.email);

    if (emailInUse) {
      throw new HttpException('Email already in use', HttpStatus.OK);
    }

    const password = await this.passwordService.hash(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, password });

    return await user.save();
  }

  async findById(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
