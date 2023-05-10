import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateVacancySkillDto } from './dto/create-vacancy-skill.dto';
import { UpdateVacancySkillDto } from './dto/update-vacancy-skill.dto';
import {
  CreateVacancySkillProps,
  CreateVacancySkillService,
  DeleteVacancySkillService,
  GetAllVacancySkillService,
  GetOneByIdVacancySkillService,
  UpdateVacancySkillProps,
  UpdateVacancySkillService,
} from './use-cases';

@Controller('vacancies/:vacancyId/skills')
export class VacancySkillController {
  constructor(
    private readonly createVacancySkillService: CreateVacancySkillService,
    private readonly updateVacancySkillService: UpdateVacancySkillService,
    private readonly deleteVacancySkillService: DeleteVacancySkillService,
    private readonly getOneByIdVacancySkillService: GetOneByIdVacancySkillService,
    private readonly getAllVacancySkillService: GetAllVacancySkillService,
  ) {}

  @Post()
  @HttpCode(201)
  create(
    @Body() createVacancySkillDto: CreateVacancySkillDto,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    const createVacancySkillProps: CreateVacancySkillProps = {
      ...createVacancySkillDto,
      vacancyId,
    };
    return this.createVacancySkillService.run(createVacancySkillProps);
  }

  @Get()
  findAll(@Param('vacancyId', ParseIntPipe) vacancyId: number) {
    return this.getAllVacancySkillService.run(vacancyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    return this.getOneByIdVacancySkillService.run(+id, vacancyId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
    @Body() updateVacancySkillDto: UpdateVacancySkillDto,
  ) {
    const updateVacancySkillProps: UpdateVacancySkillProps = {
      ...updateVacancySkillDto,
      vacancyId,
      id,
    };
    return this.updateVacancySkillService.run(updateVacancySkillProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    return this.deleteVacancySkillService.run(+id, vacancyId);
  }
}
