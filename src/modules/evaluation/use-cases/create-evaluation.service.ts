import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateEvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  public run(evaluation: Evaluation) {
    return this.evaluationsRepository.save(evaluation);
  }
}
