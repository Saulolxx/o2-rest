import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRegime } from '../entities/experience-regime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateExperienceRegimeService {
  constructor(
    @InjectRepository(ExperienceRegime)
    private experienceRegimesRepository: Repository<ExperienceRegime>,
  ) {}

  public run(experienceRegime: ExperienceRegime) {
    return this.experienceRegimesRepository.save(experienceRegime);
  }
}
