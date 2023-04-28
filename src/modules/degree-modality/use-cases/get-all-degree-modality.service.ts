import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DegreeModality } from '../entities/degree-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllDegreeModalityService {
  constructor(
    @InjectRepository(DegreeModality)
    private degreeModalitiesRepository: Repository<DegreeModality>,
  ) {}

  public run() {
    return this.degreeModalitiesRepository.find();
  }
}
