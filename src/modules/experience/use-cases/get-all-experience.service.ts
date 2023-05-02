import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  public run(personID: number) {
    return this.experiencesRepository.find({
      where: {
        personID,
      },
    });
  }
}
