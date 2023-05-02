import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  public async run(id: number, personID: number) {
    const experience = await this.experiencesRepository.findOneBy({
      id,
      personID,
    });
    if (!experience) throw new NotFoundException();

    return experience;
  }
}
