import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeModality } from '../entities/degree-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdDegreeModalityService {
  constructor(
    @InjectRepository(DegreeModality)
    private degreeModalitiesRepository: Repository<DegreeModality>,
  ) {}

  public async run(id: number) {
    const degreeModality = await this.degreeModalitiesRepository.findOneBy({ id });
    if (!degreeModality) throw new NotFoundException();

    return degreeModality;
  }
}
