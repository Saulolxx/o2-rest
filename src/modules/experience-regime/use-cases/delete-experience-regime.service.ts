import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRegime } from '../entities/experience-regime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteExperienceRegimeService {
  constructor(
    @InjectRepository(ExperienceRegime)
    private experienceRegimesRepository: Repository<ExperienceRegime>,
  ) {}

  public async run(id: number) {
    await this.experienceRegimesRepository.delete({ id });
    return;
  }
}
