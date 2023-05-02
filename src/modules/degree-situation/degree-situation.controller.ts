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
import { CreateDegreeSituationDto } from './dto/create-degree-situation.dto';
import { UpdateDegreeSituationDto } from './dto/update-degree-situation.dto';
import { DegreeSituation } from './entities/degree-situation.entity';
import {
  CreateDegreeSituationService,
  DeleteDegreeSituationService,
  GetAllDegreeSituationService,
  GetOneByIdDegreeSituationService,
  UpdateDegreeSituationService,
} from './use-cases';

@Controller('degree-situations')
export class DegreeSituationController {
  constructor(
    private readonly createDegreeSituationService: CreateDegreeSituationService,
    private readonly updateDegreeSituationService: UpdateDegreeSituationService,
    private readonly deleteDegreeSituationService: DeleteDegreeSituationService,
    private readonly getOneByIdDegreeSituationService: GetOneByIdDegreeSituationService,
    private readonly getAllDegreeSituationService: GetAllDegreeSituationService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createDegreeSituationDto: CreateDegreeSituationDto) {
    const degreeSituation = new DegreeSituation();

    Object.assign(degreeSituation, createDegreeSituationDto);

    return this.createDegreeSituationService.run(degreeSituation);
  }

  @Get()
  findAll() {
    return this.getAllDegreeSituationService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdDegreeSituationService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDegreeSituationDto: UpdateDegreeSituationDto,
  ) {
    const updatedDegreeSituation = new DegreeSituation();

    Object.assign(updatedDegreeSituation, updateDegreeSituationDto);

    return this.updateDegreeSituationService.run(+id, updatedDegreeSituation);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteDegreeSituationService.run(+id);
  }
}
