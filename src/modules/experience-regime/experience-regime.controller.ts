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
import { CreateExperienceRegimeDto } from './dto/create-experience-regime.dto';
import { UpdateExperienceRegimeDto } from './dto/update-experience-regime.dto';
import { ExperienceRegime } from './entities/experience-regime.entity';
import {
  CreateExperienceRegimeService,
  DeleteExperienceRegimeService,
  GetAllExperienceRegimeService,
  GetOneByIdExperienceRegimeService,
  UpdateExperienceRegimeService,
} from './use-cases';

@Controller('experience-regimes')
export class ExperienceRegimeController {
  constructor(
    private readonly createExperienceRegimeService: CreateExperienceRegimeService,
    private readonly updateExperienceRegimeService: UpdateExperienceRegimeService,
    private readonly deleteExperienceRegimeService: DeleteExperienceRegimeService,
    private readonly getOneByIdExperienceRegimeService: GetOneByIdExperienceRegimeService,
    private readonly getAllExperienceRegimeService: GetAllExperienceRegimeService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createExperienceRegimeDto: CreateExperienceRegimeDto) {
    const experienceRegime = new ExperienceRegime();

    Object.assign(experienceRegime, createExperienceRegimeDto);

    return this.createExperienceRegimeService.run(experienceRegime);
  }

  @Get()
  findAll() {
    return this.getAllExperienceRegimeService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdExperienceRegimeService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceRegimeDto: UpdateExperienceRegimeDto,
  ) {
    const updatedExperienceRegime = new ExperienceRegime();

    Object.assign(updatedExperienceRegime, updateExperienceRegimeDto);

    return this.updateExperienceRegimeService.run(+id, updatedExperienceRegime);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteExperienceRegimeService.run(+id);
  }
}
