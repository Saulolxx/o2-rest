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
import { CreateSeniorityDto } from './dto/create-seniority.dto';
import { UpdateSeniorityDto } from './dto/update-seniority.dto';
import { Seniority } from './entities/seniority.entity';
import {
  CreateSeniorityService,
  DeleteSeniorityService,
  GetAllSeniorityService,
  GetOneByIdSeniorityService,
  UpdateSeniorityService,
} from './use-cases';
import { plainToClass } from 'class-transformer';

@Controller('seniorities')
export class SeniorityController {
  constructor(
    private readonly createSeniorityService: CreateSeniorityService,
    private readonly updateSeniorityService: UpdateSeniorityService,
    private readonly deleteSeniorityService: DeleteSeniorityService,
    private readonly getOneByIdSeniorityService: GetOneByIdSeniorityService,
    private readonly getAllSeniorityService: GetAllSeniorityService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSeniorityDto: CreateSeniorityDto) {
    const seniority = new Seniority();

    Object.assign(seniority, createSeniorityDto);

    return this.createSeniorityService.run(seniority);
  }

  @Get()
  findAll() {
    return this.getAllSeniorityService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdSeniorityService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeniorityDto: UpdateSeniorityDto,
  ) {
    const updatedSeniority = new Seniority();

    Object.assign(updatedSeniority, updateSeniorityDto);

    return this.updateSeniorityService.run(+id, updatedSeniority);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteSeniorityService.run(+id);
  }
}
