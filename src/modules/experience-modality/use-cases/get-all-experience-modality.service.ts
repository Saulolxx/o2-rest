import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceModality } from '../entities/experience-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllExperienceModalityService {
  constructor(
    @InjectRepository(ExperienceModality)
    private experienceModalitiesRepository: Repository<ExperienceModality>,
  ) {}

  public run() {
    return this.experienceModalitiesRepository.find();
  }
}
