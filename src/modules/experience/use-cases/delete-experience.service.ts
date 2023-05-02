import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  public async run(id: number, personID: number) {
    await this.experiencesRepository.delete({ id, personID });
    return;
  }
}
