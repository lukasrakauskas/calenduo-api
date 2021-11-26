import { Routes } from '@nestjs/core';
import { JobsModule } from './modules/jobs/jobs.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TeamsModule } from './modules/teams/teams.module';

export const routes: Routes = [
  {
    path: '/teams',
    module: TeamsModule,
    children: [
      {
        path: '/:teamId/jobs',
        module: JobsModule,
        children: [
          {
            path: '/:jobId/reviews',
            module: ReviewsModule,
          },
        ],
      },
    ],
  },
];
