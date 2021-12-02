import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Exception } from 'src/common/exceptions';

@ApiTags('teams')
@ApiBearerAuth()
@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ operationId: 'createTeam' })
  @ApiUnauthorizedResponse({ type: () => Exception })
  @ApiConflictResponse({ type: () => Exception })
  create(@Body() createTeamDto: CreateTeamDto, @CurrentUser() user: User) {
    return this.teamsService.create(createTeamDto, user);
  }

  @Get()
  @ApiOperation({ operationId: 'findAllTeams' })
  findAll(@CurrentUser() user: User) {
    return this.teamsService.findByUser(user);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findTeamById' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateTeam' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @CurrentUser() user: User,
  ) {
    return this.teamsService.update(id, updateTeamDto, user);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteTeam' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.teamsService.remove(id, user);
  }

  @Get(':id/members')
  @ApiOperation({ operationId: 'findTeamMembers' })
  findMembers(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findMembers(id);
  }
}
