import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeSituation } from '../entities/degree-situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateDegreeSituationService {
  constructor(
    @InjectRepository(DegreeSituation)
    private degreeSituationsRepository: Repository<DegreeSituation>,
  ) {}

  public async run(id: number, updatedDegreeSituation: DegreeSituation) {
    const degreeSituation = await this.degreeSituationsRepository.findOneBy({ id });

    if (!degreeSituation) {
      throw new NotFoundException();
    }

    Object.assign(degreeSituation, updatedDegreeSituation);

    return this.degreeSituationsRepository.save(degreeSituation);
  }
}
