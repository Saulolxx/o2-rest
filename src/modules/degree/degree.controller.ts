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
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree } from './entities/degree.entity';
import {
  CreateDegreeProps,
  CreateDegreeService,
  DeleteDegreeService,
  GetAllDegreeService,
  GetOneByIdDegreeService,
  UpdateDegreeProps,
  UpdateDegreeService,
} from './use-cases';

@Controller('persons/:person_id/degrees')
export class DegreeController {
  constructor(
    private readonly createDegreeService: CreateDegreeService,
    private readonly updateDegreeService: UpdateDegreeService,
    private readonly deleteDegreeService: DeleteDegreeService,
    private readonly getOneByIdDegreeService: GetOneByIdDegreeService,
    private readonly getAllDegreeService: GetAllDegreeService,
  ) {}

  @Post()
  @HttpCode(201)
  create(
    @Param('person_id', ParseIntPipe) personID: number,
    @Body() createDegreeDto: CreateDegreeDto,
  ) {
    const createDegreeProps: CreateDegreeProps = {
      ...createDegreeDto,
      personID,
    };
    return this.createDegreeService.run(createDegreeProps);
  }

  @Get()
  findAll(@Param('person_id', ParseIntPipe) personID: number) {
    return this.getAllDegreeService.run(personID);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('person_id', ParseIntPipe) personID: number,
  ) {
    return this.getOneByIdDegreeService.run(+id, personID);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDegreeDto: UpdateDegreeDto,
    @Param('person_id', ParseIntPipe) personID: number,
  ) {
    const updateDegreeProps: UpdateDegreeProps = {
      id,
      personID,
      ...updateDegreeDto,
    };
    return this.updateDegreeService.run(updateDegreeProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('person_id', ParseIntPipe) personID: number,
  ) {
    return this.deleteDegreeService.run(id, personID);
  }
}
