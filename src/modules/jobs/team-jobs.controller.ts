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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('team-jobs')
@ApiBearerAuth()
@Controller('teams/:teamId/jobs')
export class TeamJobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(
    @Body() createJobDto: CreateJobDto,
    @Param('teamId', ParseIntPipe) teamId: number,
    @CurrentUser() user: User,
  ) {
    return this.jobsService.create(createJobDto, teamId, user);
  }

  @Get()
  findAll(@Param('teamId') teamId: string) {
    return this.jobsService.findAll(+teamId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.jobsService.findOne(id, teamId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.jobsService.update(id, updateJobDto, user, teamId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.jobsService.remove(id, user);
  }
}
