import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';

@Injectable()
export class DeleteExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(id: number, personID: number) {
    await this.getOnePerson.run(personID);
    await this.experiencesRepository.delete({ id, personID });
    return;
  }
}
