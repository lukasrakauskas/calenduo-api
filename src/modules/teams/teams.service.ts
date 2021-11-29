import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto, user: User) {
    if (await this.isSlugInUse(createTeamDto.slug))
      throw new ConflictException('Slug already in use');

    const team = this.teamRepository.create({
      ...createTeamDto,
      ownerId: user.id,
    });
    return await team.save();
  }

  async findByUser(user: User) {
    return await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members')
      .leftJoinAndSelect('team.owner', 'owner')
      .where('members.id = :userId OR owner.id = :userId', { userId: user.id })
      .getMany();
  }

  async findAll() {
    return await this.teamRepository.find();
  }

  async findOne(id: number, relations?: string[]) {
    const team = await this.teamRepository.findOne(
      id,
      relations ? { relations } : undefined,
    );

    if (team == null) throw new NotFoundException('Team not found');

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto, user: User) {
    const team = await this.teamRepository.findOne(id, {
      relations: ['owner'],
    });

    if (team == null) throw new NotFoundException('Team not found');

    if (updateTeamDto.slug && (await this.isSlugInUse(updateTeamDto.slug)))
      throw new ConflictException('Slug already in use');

    if (user.id !== team.ownerId)
      throw new ForbiddenException('You are not the owner of this team');

    const updatedTeam = this.teamRepository.merge(team, updateTeamDto);

    return await updatedTeam.save();
  }

  async remove(id: number, user: User) {
    const team = await this.teamRepository.findOne(id);

    if (!team) throw new NotFoundException('Team not found');

    if (user.id !== team.ownerId)
      throw new ForbiddenException('You are not the owner of this team');

    return await this.teamRepository.remove(team);
  }

  private async isSlugInUse(slug: string) {
    const team = await this.teamRepository.findOne({ where: { slug } });
    return team != null;
  }

  public async isMember(team: Team, user: User) {
    const members = await team.members;
    return (
      user.id === team.ownerId ||
      members.some((member) => member.id === user.id)
    );
  }
}
