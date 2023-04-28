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
import { CreateDegreeModalityDto } from './dto/create-degree-modality.dto';
import { UpdateDegreeModalityDto } from './dto/update-degree-modality.dto';
import { DegreeModality } from './entities/degree-modality.entity';
import {
  CreateDegreeModalityService,
  DeleteDegreeModalityService,
  GetAllDegreeModalityService,
  GetOneByIdDegreeModalityService,
  UpdateDegreeModalityService,
} from './use-cases';

@Controller('degree-modalities')
export class DegreeModalityController {
  constructor(
    private readonly createDegreeModalityService: CreateDegreeModalityService,
    private readonly updateDegreeModalityService: UpdateDegreeModalityService,
    private readonly deleteDegreeModalityService: DeleteDegreeModalityService,
    private readonly getOneByIdDegreeModalityService: GetOneByIdDegreeModalityService,
    private readonly getAllDegreeModalityService: GetAllDegreeModalityService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createDegreeModalityDto: CreateDegreeModalityDto) {
    const degreeModality = new DegreeModality();

    Object.assign(degreeModality, createDegreeModalityDto);

    return this.createDegreeModalityService.run(degreeModality);
  }

  @Get()
  findAll() {
    return this.getAllDegreeModalityService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdDegreeModalityService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDegreeModalityDto: UpdateDegreeModalityDto,
  ) {
    const updatedDegreeModality = new DegreeModality();

    Object.assign(updatedDegreeModality, updateDegreeModalityDto);

    return this.updateDegreeModalityService.run(+id, updatedDegreeModality);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteDegreeModalityService.run(+id);
  }
}
