import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdEvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  public async run(id: number) {
    const evaluation = await this.evaluationsRepository.findOneBy({ id });
    if (!evaluation) throw new NotFoundException();

    return evaluation;
  }
}
