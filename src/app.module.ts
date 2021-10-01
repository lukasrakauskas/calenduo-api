import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PasswordsModule } from './modules/passwords/passwords.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { RolesModule } from './modules/roles/roles.module';
import { EventTypesModule } from './modules/event-types/event-types.module';
import { TeamsModule } from './modules/teams/teams.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    PasswordsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    EventTypesModule,
    TeamsModule,
    JobsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
