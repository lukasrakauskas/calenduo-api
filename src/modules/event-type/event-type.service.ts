import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventType } from './entities/event-type.entity';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto, user: User) {
    const slugInUse = await this.findBySlug(createEventTypeDto.slug, user);

    if (slugInUse) {
      throw new HttpException('Slug is already in use', HttpStatus.OK);
    }

    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    eventType.user = user;
    return await eventType.save();
  }

  async findAll(user: User) {
    return await this.eventTypeRepository.find({ where: { user } });
  }

  async findOne(id: number) {
    return await this.eventTypeRepository.findOne(id);
  }

  update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    return `This action updates a #${id} eventType`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventType`;
  }

  async findBySlug(slug: string, user: User) {
    return await this.eventTypeRepository.findOne({ where: { slug, user } });
  }
}
