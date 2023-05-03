import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteEvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  public async run(id: number) {
    await this.evaluationsRepository.delete({ id });
    return;
  }
}
