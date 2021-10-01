import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-types')
@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Post()
  create(
    @Body() createEventTypeDto: CreateEventTypeDto,
    @CurrentUser() user: User,
  ) {
    return this.eventTypesService.create(createEventTypeDto, user);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.eventTypesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
    @CurrentUser() user: User,
  ) {
    return this.eventTypesService.update(+id, updateEventTypeDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.eventTypesService.remove(+id, user);
  }
}
