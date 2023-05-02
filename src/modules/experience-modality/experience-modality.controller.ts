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
import { CreateExperienceModalityDto } from './dto/create-experience-modality.dto';
import { UpdateExperienceModalityDto } from './dto/update-experience-modality.dto';
import { ExperienceModality } from './entities/experience-modality.entity';
import {
  CreateExperienceModalityService,
  DeleteExperienceModalityService,
  GetAllExperienceModalityService,
  GetOneByIdExperienceModalityService,
  UpdateExperienceModalityService,
} from './use-cases';

@Controller('experience-modalities')
export class ExperienceModalityController {
  constructor(
    private readonly createExperienceModalityService: CreateExperienceModalityService,
    private readonly updateExperienceModalityService: UpdateExperienceModalityService,
    private readonly deleteExperienceModalityService: DeleteExperienceModalityService,
    private readonly getOneByIdExperienceModalityService: GetOneByIdExperienceModalityService,
    private readonly getAllExperienceModalityService: GetAllExperienceModalityService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createExperienceModalityDto: CreateExperienceModalityDto) {
    const experienceModality = new ExperienceModality();

    Object.assign(experienceModality, createExperienceModalityDto);

    return this.createExperienceModalityService.run(experienceModality);
  }

  @Get()
  findAll() {
    return this.getAllExperienceModalityService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdExperienceModalityService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceModalityDto: UpdateExperienceModalityDto,
  ) {
    const updatedExperienceModality = new ExperienceModality();

    Object.assign(updatedExperienceModality, updateExperienceModalityDto);

    return this.updateExperienceModalityService.run(+id, updatedExperienceModality);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteExperienceModalityService.run(+id);
  }
}
