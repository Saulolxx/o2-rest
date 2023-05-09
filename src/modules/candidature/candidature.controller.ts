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
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import {
  CreateCandidatureProps,
  CreateCandidatureService,
  DeleteCandidatureService,
  GetAllCandidatureService,
  GetAllCandidatureServiceProps,
  GetOneByIdCandidatureService,
  UpdateCandidatureProps,
  UpdateCandidatureService,
} from './use-cases';

@Controller('candidatures')
export class CandidatureController {
  constructor(
    private readonly createCandidatureService: CreateCandidatureService,
    private readonly updateCandidatureService: UpdateCandidatureService,
    private readonly deleteCandidatureService: DeleteCandidatureService,
    private readonly getOneByIdCandidatureService: GetOneByIdCandidatureService,
    private readonly getAllCandidatureService: GetAllCandidatureService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCandidatureDto: CreateCandidatureDto) {
    const createCandidatureProps: CreateCandidatureProps = {
      ...createCandidatureDto,
    };

    return this.createCandidatureService.run(createCandidatureProps);
  }

  @Get()
  findAll(getAllCandidatureServiceProps: GetAllCandidatureServiceProps) {
    return this.getAllCandidatureService.run(getAllCandidatureServiceProps);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getOneByIdCandidatureService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidatureDto: UpdateCandidatureDto,
  ) {
    const updateCandidatureProps: UpdateCandidatureProps = {
      id,
      ...updateCandidatureDto,
    };

    return this.updateCandidatureService.run(updateCandidatureProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCandidatureService.run(+id);
  }
}
