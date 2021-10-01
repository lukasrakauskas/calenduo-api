import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
// import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), TeamsModule],
  // controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
