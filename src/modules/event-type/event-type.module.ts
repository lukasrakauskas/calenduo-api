import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { EventType } from './entities/event-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
