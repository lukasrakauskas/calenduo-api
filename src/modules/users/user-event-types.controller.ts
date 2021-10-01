import { Controller, Get, Param } from '@nestjs/common';
import { EventTypesService } from '../event-types/event-types.service';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-event-types')
@Controller('users/:userId/event-types')
export class UserEventTypesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventTypesService: EventTypesService,
  ) {}

  @Get()
  @Public()
  async findAll(@Param('userId') userId: string) {
    const user = await this.usersService.findById(+userId);
    return this.eventTypesService.findAll(user);
  }

  @Get(':eventId')
  @Public()
  findOne(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.eventTypesService.findOne(+eventId);
  }
}
