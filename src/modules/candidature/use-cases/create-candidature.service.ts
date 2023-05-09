import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidature } from '../entities/candidature.entity';
import { Repository } from 'typeorm';
import { GetOneByIdVacancyService } from 'src/modules/vacancy/use-cases';
import { GetOnePerson } from 'src/modules/person/use-cases';

export type CreateCandidatureProps = {
  personId: number;
  vacancyId: number;
  subscribedAt?: Date;
};

@Injectable()
export class CreateCandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private candidatureRepository: Repository<Candidature>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneVacancy: GetOneByIdVacancyService,
  ) {}

  public async run({
    personId,
    vacancyId,
    subscribedAt,
  }: CreateCandidatureProps) {
    const vacancy = await this.getOneVacancy.run(vacancyId);
    const person = await this.getOnePerson.run(personId);

    const candidature = new Candidature();

    Object.assign(candidature, {
      vacancy,
      person,
      subscribedAt: subscribedAt ? subscribedAt : new Date(),
    });

    await this.candidatureRepository.save(candidature);

    delete candidature.person;
    delete candidature.vacancy;

    return {
      ...candidature,
    };
  }
}
