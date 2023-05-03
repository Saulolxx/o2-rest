import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateEvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  public async run(id: number, updatedEvaluation: Evaluation) {
    const evaluation = await this.evaluationsRepository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException();
    }

    Object.assign(evaluation, updatedEvaluation);

    return this.evaluationsRepository.save(evaluation);
  }
}
