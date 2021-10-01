import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { User } from '../users/entities/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    private teamService: TeamsService,
  ) {}

  async create(createJobDto: CreateJobDto, teamId: number, user: User) {
    const team = await this.teamService.findOne(teamId);

    if (!(await this.teamService.isMember(team, user)))
      throw new ForbiddenException('You are not a member of this team');

    return await this.jobRepository.create({
      ...createJobDto,
      team: Promise.resolve(team),
    });
  }

  async findAll(teamId?: number) {
    const findOptions =
      teamId != null ? { where: { team: { id: teamId } } } : undefined;
    return await this.jobRepository.find(findOptions);
  }

  async findOne(id: number, teamId?: number) {
    const job = await this.jobRepository.findOne(id, { relations: ['team'] });

    if (job == null) throw new NotFoundException(`Job with ID ${id} not found`);

    if (teamId != null && (await job.team).id !== teamId)
      throw new ForbiddenException(
        `Job with ID ${id} does not belong to team with ID ${teamId}`,
      );

    return job;
  }

  async update(
    id: number,
    updateJobDto: UpdateJobDto,
    user: User,
    teamId?: number,
  ) {
    const job = await this.jobRepository.findOne(id, {
      relations: ['team', 'team.members'],
    });

    if (job == null)
      throw new NotFoundException(`Job with ID "${id}" not found`);

    const team = await job.team;

    if (!(await this.teamService.isMember(team, user)))
      throw new ForbiddenException('You are not a member of this team');

    if (teamId != null && team.id !== teamId)
      throw new ForbiddenException(
        `Job with ID ${id} does not belong to team with ID ${teamId}`,
      );

    const updatedTeam = this.jobRepository.merge(job, updateJobDto);

    return await updatedTeam.save();
  }

  async remove(id: number, user: User, teamId?: number) {
    const job = await this.jobRepository.findOne(id, {
      relations: ['team', 'team.members'],
    });

    if (job == null)
      throw new NotFoundException(`Job with ID "${id}" not found`);

    const team = await job.team;

    if (!(await this.teamService.isMember(team, user)))
      throw new ForbiddenException('You are not a member of this team');

    if (teamId != null && team.id !== teamId)
      throw new ForbiddenException(
        `Job with ID ${id} does not belong to team with ID ${teamId}`,
      );

    return await this.jobRepository.remove(job);
  }
}
