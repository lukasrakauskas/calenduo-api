import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JobsService } from '../jobs/jobs.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { TeamsService } from '../teams/teams.service';

@ApiTags('team-job-reviews')
@ApiBearerAuth()
@Controller()
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly jobService: JobsService,
    private readonly teamService: TeamsService,
  ) {}

  // TODO: refactor so if a resource is not found, it returns a 404, or if it doesnt belong to other resource throws an error

  @Post()
  @ApiOperation({ operationId: 'createReview ' })
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
  @ApiOperation({ operationId: 'findAllReviews' })
  async findAll(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return this.reviewsService.findAll(jobId);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findReviewById' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.findOne(id, jobId);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateReview' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() user: User,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.update(id, updateReviewDto, user, jobId);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteReview' })
  @ApiException(() => [UnauthorizedException, ForbiddenException])
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
    @CurrentUser() user: User,
  ) {
    await this.teamService.findOne(teamId);
    await this.jobService.findOne(jobId);
    return await this.reviewsService.remove(id, user, jobId);
  }
}
