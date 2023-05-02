import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeSituation } from '../entities/degree-situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllDegreeSituationService {
  constructor(
    @InjectRepository(DegreeSituation)
    private degreeSituationsRepository: Repository<DegreeSituation>,
  ) {}

  public run() {
    return this.degreeSituationsRepository.find();
  }
}
