import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const enviroment = this.configService.get('NODE_ENV');
    const isProduction = enviroment === 'production';

    return {
      type: 'postgres',
      url: this.configService.get('DATABASE_URL'),
      entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
      synchronize: true,
      ssl: isProduction ? { rejectUnauthorized: false } : undefined,
    };
  }
}
