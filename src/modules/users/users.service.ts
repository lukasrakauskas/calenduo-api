import {
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

  async create(createUserDto: CreateUserDto) {
    const emailInUse = await this.findByEmail(createUserDto.email);

    if (emailInUse) {
      throw new HttpException('Email already in use', HttpStatus.OK);
    }

    const password = await this.passwordService.hash(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, password });
    await user.save();
    return user;
  }

  async showById(id: number): Promise<User | undefined> {
    const user = await this.findById(id);
    return user;
  }

  async findById(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);
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
