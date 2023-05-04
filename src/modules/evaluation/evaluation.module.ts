import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import {
  CreateEvaluationService,
  DeleteEvaluationService,
  GetAllEvaluationService,
  GetOneByIdEvaluationService,
  UpdateEvaluationService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])],
  controllers: [EvaluationController],
  providers: [
    CreateEvaluationService,
    GetOneByIdEvaluationService,
    GetAllEvaluationService,
    UpdateEvaluationService,
    DeleteEvaluationService,
  ],
})
export class EvaluationModule {}
