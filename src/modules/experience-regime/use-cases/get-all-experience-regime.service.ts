import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRegime } from '../entities/experience-regime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllExperienceRegimeService {
  constructor(
    @InjectRepository(ExperienceRegime)
    private experienceRegimesRepository: Repository<ExperienceRegime>,
  ) {}

  public run() {
    return this.experienceRegimesRepository.find();
  }
}
