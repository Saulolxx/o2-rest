import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';

@Injectable()
export class GetAllExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(personID: number) {
    await this.getOnePerson.run(personID);

    return this.experiencesRepository.find({
      where: {
        personID,
      },
    });
  }
}
