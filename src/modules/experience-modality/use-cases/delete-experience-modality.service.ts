import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceModality } from '../entities/experience-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteExperienceModalityService {
  constructor(
    @InjectRepository(ExperienceModality)
    private experienceModalitiesRepository: Repository<ExperienceModality>,
  ) {}

  public async run(id: number) {
    await this.experienceModalitiesRepository.delete({ id });
    return;
  }
}
