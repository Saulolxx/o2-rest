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
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import {
  CreateVacancyProps,
  CreateVacancyService,
  DeleteVacancyService,
  GetAllVacancyService,
  GetOneByIdVacancyService,
  UpdateVacancyProps,
  UpdateVacancyService,
} from './use-cases';
import { GetAllCandidatureService } from '../candidature/use-cases';

@Controller('vacancies')
export class VacancyController {
  constructor(
    private readonly createVacancyService: CreateVacancyService,
    private readonly updateVacancyService: UpdateVacancyService,
    private readonly deleteVacancyService: DeleteVacancyService,
    private readonly getOneByIdVacancyService: GetOneByIdVacancyService,
    private readonly getAllVacancyService: GetAllVacancyService,
    private readonly getAllCandidatures: GetAllCandidatureService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createVacancyDto: CreateVacancyDto) {
    const createVacancyProps: CreateVacancyProps = {
      ...createVacancyDto,
    };
    return this.createVacancyService.run(createVacancyProps);
  }

  @Get()
  findAll() {
    return this.getAllVacancyService.run();
  }

  @Get(':vacancyId/candidatures')
  async findAllCandidatures(
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
  ) {
    await this.getOneByIdVacancyService.run(vacancyId);
    return this.getAllCandidatures.run({ vacancyId });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getOneByIdVacancyService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    const updateVacancyProps: UpdateVacancyProps = {
      id,
      ...updateVacancyDto,
    };

    return this.updateVacancyService.run(updateVacancyProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteVacancyService.run(+id);
  }
}
