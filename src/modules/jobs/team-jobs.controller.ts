import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('teams/:teamId/jobs')
export class TeamJobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(
    @Body() createJobDto: CreateJobDto,
    @Param('teamId') teamId: string,
    @CurrentUser() user: User,
  ) {
    return this.jobsService.create(createJobDto, +teamId, user);
  }

  @Get()
  findAll(@Param('teamId') teamId: string) {
    return this.jobsService.findAll(+teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('teamId') teamId: string) {
    return this.jobsService.findOne(+id, +teamId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @CurrentUser() user: User,
    @Param('teamId') teamId: string,
  ) {
    return this.jobsService.update(+id, updateJobDto, user, +teamId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.jobsService.remove(+id, user);
  }
}
