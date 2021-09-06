import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import { Role } from 'src/modules/roles/enums/role.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];

  @OneToMany(() => EventType, (eventType) => eventType.user)
  eventTypes: EventType[];
}
