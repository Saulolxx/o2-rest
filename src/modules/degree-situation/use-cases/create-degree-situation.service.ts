import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeSituation } from '../entities/degree-situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateDegreeSituationService {
  constructor(
    @InjectRepository(DegreeSituation)
    private degreeSituationsRepository: Repository<DegreeSituation>,
  ) {}

  public run(degreeSituation: DegreeSituation) {
    return this.degreeSituationsRepository.save(degreeSituation);
  }
}
