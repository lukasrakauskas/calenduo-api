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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JobsService } from '../jobs/jobs.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { TeamsService } from '../teams/teams.service';

@ApiTags('team-job-reviews')
@ApiBearerAuth()
@Controller('teams/:teamId/jobs/:jobId/reviews')
export class TeamJobReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly jobService: JobsService,
    private readonly teamService: TeamsService,
  ) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.create(createReviewDto, jobId);
  }

  @Get()
  async findAll(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() user: User,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.update(id, updateReviewDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
    @CurrentUser() user: User,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.remove(id, user);
  }
}
