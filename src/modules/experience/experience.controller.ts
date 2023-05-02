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

@Controller('experiences')
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
  create(@Body() createExperienceDto: CreateExperienceDto) {
    const createExperienceProps: CreateExperienceProps = {
      ...createExperienceDto,
    };
    return this.createExperienceService.run(createExperienceProps);
  }

  @Get()
  findAll() {
    return this.getAllExperienceService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdExperienceService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    const updateExperienceProps: UpdateExperienceProps = {
      ...updateExperienceDto,
      id,
    };

    return this.updateExperienceService.run(updateExperienceProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteExperienceService.run(+id);
  }
}
