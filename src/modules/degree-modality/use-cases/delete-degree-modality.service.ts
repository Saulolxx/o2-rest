import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeModality } from '../entities/degree-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteDegreeModalityService {
  constructor(
    @InjectRepository(DegreeModality)
    private degreeModalitiesRepository: Repository<DegreeModality>,
  ) {}

  public async run(id: number) {
    await this.degreeModalitiesRepository.delete({ id });
    return;
  }
}
