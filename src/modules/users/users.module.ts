import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordsModule } from 'src/modules/passwords/passwords.module';
import { EventTypesModule } from 'src/modules/event-types/event-types.module';
import { UserEventTypesController } from './user-event-types.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PasswordsModule,
    EventTypesModule,
  ],
  controllers: [UsersController, UserEventTypesController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
