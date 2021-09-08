import { Module } from '@nestjs/common';
import { EventTypeService } from './event-types.service';
import { EventTypeController } from './event-types.controller';
import { EventType } from './entities/event-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [EventTypeController],
  providers: [EventTypeService],
  exports: [EventTypeService],
})
export class EventTypeModule {}
