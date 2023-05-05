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
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import {
  CreateEvaluationService,
  DeleteEvaluationService,
  GetAllEvaluationService,
  GetOneByIdEvaluationService,
  UpdateEvaluationService,
} from './use-cases';

@Controller('evaluations')
export class EvaluationController {
  constructor(
    private readonly createEvaluationService: CreateEvaluationService,
    private readonly updateEvaluationService: UpdateEvaluationService,
    private readonly deleteEvaluationService: DeleteEvaluationService,
    private readonly getOneByIdEvaluationService: GetOneByIdEvaluationService,
    private readonly getAllEvaluationService: GetAllEvaluationService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    const evaluation = new Evaluation();

    Object.assign(evaluation, createEvaluationDto);

    return this.createEvaluationService.run(evaluation);
  }

  @Get()
  findAll() {
    return this.getAllEvaluationService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdEvaluationService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    const updatedEvaluation = new Evaluation();

    Object.assign(updatedEvaluation, updateEvaluationDto);

    return this.updateEvaluationService.run(+id, updatedEvaluation);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteEvaluationService.run(+id);
  }
}
