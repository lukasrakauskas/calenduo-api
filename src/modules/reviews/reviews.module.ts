import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { TeamJobReviewsController } from './team-job-reviews.controller';
import { ReviewsService } from './reviews.service';
import { JobsModule } from '../jobs/jobs.module';
import { UsersModule } from '../users/users.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TeamsModule,
    JobsModule,
    UsersModule,
  ],
  controllers: [TeamJobReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
