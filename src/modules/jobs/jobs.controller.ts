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
import { TeamsService } from '../teams/teams.service';

@ApiTags('team-jobs')
@ApiBearerAuth()
@Controller()
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly teamsService: TeamsService,
  ) {}

  @Post()
  async create(
    @Body() createJobDto: CreateJobDto,
    @Param('teamId', ParseIntPipe) teamId: number,
    @CurrentUser() user: User,
  ) {
    await this.teamsService.findOne(teamId);
    return await this.jobsService.create(createJobDto, teamId, user);
  }

  @Get()
  async findAll(@Param('teamId', ParseIntPipe) teamId: number) {
    await this.teamsService.findOne(teamId);
    return await this.jobsService.findAll(teamId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    await this.teamsService.findOne(teamId);
    return await this.jobsService.findOne(id, teamId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    await this.teamsService.findOne(teamId);
    return await this.jobsService.update(id, updateJobDto, user, teamId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @CurrentUser() user: User,
  ) {
    await this.teamsService.findOne(teamId);
    return await this.jobsService.remove(id, user);
  }
}
