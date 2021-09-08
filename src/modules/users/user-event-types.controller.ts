import { Controller, Get, Param } from '@nestjs/common';
import { EventTypeService } from '../event-types/event-types.service';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-event-types')
@Controller('users/:userId/event-types')
export class UserEventTypesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventTypeService: EventTypeService,
  ) {}

  @Get()
  @Public()
  async findAll(@Param('userId') userId: string) {
    const user = await this.usersService.findById(+userId);
    return this.eventTypeService.findAll(user);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(+id);
  }
}
