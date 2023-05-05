import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceModality } from '../entities/experience-modality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateExperienceModalityService {
  constructor(
    @InjectRepository(ExperienceModality)
    private experienceModalitiesRepository: Repository<ExperienceModality>,
  ) {}

  public async run(id: number, updatedExperienceModality: ExperienceModality) {
    const experienceModality =
      await this.experienceModalitiesRepository.findOneBy({ id });

    if (!experienceModality) {
      throw new NotFoundException();
    }

    Object.assign(experienceModality, updatedExperienceModality);

    return this.experienceModalitiesRepository.save(experienceModality);
  }
}
