import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventType } from './entities/event-type.entity';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto, user: User) {
    const slugInUse = await this.findBySlug(createEventTypeDto.slug, user);

    if (slugInUse) {
      throw new HttpException('This slug is already in use', HttpStatus.OK);
    }

    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    eventType.user = user;
    return await eventType.save();
  }

  async findAll(user?: User) {
    return await this.eventTypeRepository.find(
      user ? { where: { user } } : undefined,
    );
  }

  async findOne(id: number) {
    return await this.eventTypeRepository.findOne(id);
  }

  async findBySlug(slug: string, user: User) {
    return await this.eventTypeRepository.findOne({
      where: { slug, user },
    });
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto, user: User) {
    const eventType = await this.eventTypeRepository.findOneOrFail(id);

    if (eventType.user.id !== user.id || !user.roles.includes(Role.Admin)) {
      throw new HttpException(
        'You are not allowed to update this event type',
        HttpStatus.OK,
      );
    }

    return await this.eventTypeRepository.save({
      ...eventType,
      ...updateEventTypeDto,
    });
  }

  async remove(id: number, user: User) {
    const eventType = await this.eventTypeRepository.findOneOrFail(id);

    if (eventType.user.id !== user.id || !user.roles.includes(Role.Admin)) {
      throw new HttpException(
        'You are not allowed to remove this event type',
        HttpStatus.OK,
      );
    }

    return await eventType.remove();
  }
}
