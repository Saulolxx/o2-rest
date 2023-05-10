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
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import {
  CreateSkillService,
  DeleteSkillService,
  GetAllSkillService,
  GetOneByIdSkillService,
  UpdateSkillService,
} from './use-cases';

@Controller('skills')
export class SkillController {
  constructor(
    private readonly createSkillService: CreateSkillService,
    private readonly updateSkillService: UpdateSkillService,
    private readonly deleteSkillService: DeleteSkillService,
    private readonly getOneByIdSkillService: GetOneByIdSkillService,
    private readonly getAllSkillService: GetAllSkillService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSkillDto: CreateSkillDto) {
    const skill = new Skill();

    Object.assign(skill, createSkillDto);

    return this.createSkillService.run(skill);
  }

  @Get()
  findAll() {
    return this.getAllSkillService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdSkillService.run(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    const updatedSkill = new Skill();

    Object.assign(updatedSkill, updateSkillDto);

    return this.updateSkillService.run(+id, updatedSkill);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteSkillService.run(+id);
  }
}
