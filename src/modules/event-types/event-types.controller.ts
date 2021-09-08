import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventTypeService } from './event-types.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { User } from '../users/entities/user.entity';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  create(
    @Body() createEventTypeDto: CreateEventTypeDto,
    @CurrentUser() user: User,
  ) {
    return this.eventTypeService.create(createEventTypeDto, user);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.eventTypeService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
    @CurrentUser() user: User,
  ) {
    return this.eventTypeService.update(+id, updateEventTypeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.eventTypeService.remove(+id, user);
  }
}
