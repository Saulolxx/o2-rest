import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeSituation } from '../entities/degree-situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteDegreeSituationService {
  constructor(
    @InjectRepository(DegreeSituation)
    private degreeSituationsRepository: Repository<DegreeSituation>,
  ) {}

  public async run(id: number) {
    await this.degreeSituationsRepository.delete({ id });
    return;
  }
}
