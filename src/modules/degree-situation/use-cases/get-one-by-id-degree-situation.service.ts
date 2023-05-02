import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeSituation } from '../entities/degree-situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdDegreeSituationService {
  constructor(
    @InjectRepository(DegreeSituation)
    private degreeSituationsRepository: Repository<DegreeSituation>,
  ) {}

  public async run(id: number) {
    const degreeSituation = await this.degreeSituationsRepository.findOneBy({ id });
    if (!degreeSituation) throw new NotFoundException();

    return degreeSituation;
  }
}
