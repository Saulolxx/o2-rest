import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateSkillLevelDto } from './dto/create-skill-level.dto';
import { UpdateSkillLevelDto } from './dto/update-skill-level.dto';
import { SkillLevel } from './entities/skill-level.entity';
import {
  CreateSkillLevelService,
  DeleteSkillLevelService,
  GetAllSkillLevelService,
  GetOneByIdSkillLevelService,
  UpdateSkillLevelService,
} from './use-cases';

@Controller('skill-levels')
export class SkillLevelController {
  constructor(
    private readonly createSkillLevelService: CreateSkillLevelService,
    private readonly updateSkillLevelService: UpdateSkillLevelService,
    private readonly deleteSkillLevelService: DeleteSkillLevelService,
    private readonly getOneByIdSkillLevelService: GetOneByIdSkillLevelService,
    private readonly getAllSkillLevelService: GetAllSkillLevelService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSkillLevelDto: CreateSkillLevelDto) {
    const skillLevel = new SkillLevel();

    Object.assign(skillLevel, createSkillLevelDto);

    return this.createSkillLevelService.run(skillLevel);
  }

  @Get()
  findAll() {
    return this.getAllSkillLevelService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdSkillLevelService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillLevelDto: UpdateSkillLevelDto,
  ) {
    const updatedSkillLevel = new SkillLevel();

    Object.assign(updatedSkillLevel, updateSkillLevelDto);

    return this.updateSkillLevelService.run(+id, updatedSkillLevel);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteSkillLevelService.run(+id);
  }
}
