import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeModality } from '../entities/degree-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateDegreeModalityService {
  constructor(
    @InjectRepository(DegreeModality)
    private degreeModalitiesRepository: Repository<DegreeModality>,
  ) {}

  public async run(id: number, updatedDegreeModality: DegreeModality) {
    const degreeModality = await this.degreeModalitiesRepository.findOneBy({
      id,
    });

    if (!degreeModality) {
      throw new NotFoundException();
    }

    Object.assign(degreeModality, updatedDegreeModality);

    return this.degreeModalitiesRepository.save(degreeModality);
  }
}
