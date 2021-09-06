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
import { EventTypeModule } from './modules/event-type/event-type.module';

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
    EventTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
