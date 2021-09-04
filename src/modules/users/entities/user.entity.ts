import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@UseInterceptors(ClassSerializerInterceptor)
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
