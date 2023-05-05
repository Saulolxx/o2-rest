import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRegime } from '../entities/experience-regime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdExperienceRegimeService {
  constructor(
    @InjectRepository(ExperienceRegime)
    private experienceRegimesRepository: Repository<ExperienceRegime>,
  ) {}

  public async run(id: number) {
    const experienceRegime = await this.experienceRegimesRepository.findOneBy({
      id,
    });
    if (!experienceRegime) throw new NotFoundException();

    return experienceRegime;
  }
}
