import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Role } from 'src/modules/roles/enums/role.enum';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];

  @OneToMany(() => Team, (team) => team.owner)
  teams: Promise<Team[]>;
}
