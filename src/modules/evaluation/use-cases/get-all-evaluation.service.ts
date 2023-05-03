import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllEvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
  ) {}

  public run() {
    return this.evaluationsRepository.find();
  }
}
