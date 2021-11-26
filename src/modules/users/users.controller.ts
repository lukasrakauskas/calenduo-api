import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ operationId: 'getUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Public()
  @ApiOperation({ operationId: 'createUser' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findUserById' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  // update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
  //   return `This action updates a #${id} eventType`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} eventType`;
  // }
}
