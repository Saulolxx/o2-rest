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
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import {
  CreateExperienceProps,
  CreateExperienceService,
  DeleteExperienceService,
  GetAllExperienceService,
  GetOneByIdExperienceService,
  UpdateExperienceProps,
  UpdateExperienceService,
} from './use-cases';

@Controller('persons/:person_id/experiences')
export class ExperienceController {
  constructor(
    private readonly createExperienceService: CreateExperienceService,
    private readonly updateExperienceService: UpdateExperienceService,
    private readonly deleteExperienceService: DeleteExperienceService,
    private readonly getOneByIdExperienceService: GetOneByIdExperienceService,
    private readonly getAllExperienceService: GetAllExperienceService,
  ) {}

  @Post()
  @HttpCode(201)
  create(
    @Param('person_id', ParseIntPipe) personID: number,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    const createExperienceProps: CreateExperienceProps = {
      personID,
      ...createExperienceDto,
    };
    return this.createExperienceService.run(createExperienceProps);
  }

  @Get()
  findAll(@Param('person_id', ParseIntPipe) personID: number) {
    return this.getAllExperienceService.run(personID);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('person_id', ParseIntPipe) personID: number,
  ) {
    return this.getOneByIdExperienceService.run(+id, personID);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('person_id', ParseIntPipe) personID: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    const updateExperienceProps: UpdateExperienceProps = {
      ...updateExperienceDto,
      id,
      personID,
    };

    return this.updateExperienceService.run(updateExperienceProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id') id: string,
    @Param('person_id', ParseIntPipe) personID: number,
  ) {
    return this.deleteExperienceService.run(+id, personID);
  }
}
