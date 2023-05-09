import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidature } from '../entities/candidature.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneByIdVacancyService } from 'src/modules/vacancy/use-cases';

export type UpdateCandidatureProps = {
  id: number;
  vacancyId: number;
  personId?: number;
  subscribedAt?: Date;
};

@Injectable()
export class UpdateCandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private candidatureRepository: Repository<Candidature>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneVacancy: GetOneByIdVacancyService,
  ) {}

  public async run({
    id,
    vacancyId,
    personId,
    subscribedAt,
  }: UpdateCandidatureProps) {
    const candidature = await this.candidatureRepository.findOneBy({
      id,
    });

    if (!candidature) {
      throw new NotFoundException();
    }

    if (personId) {
      const person = await this.getOnePerson.run(personId);

      if (!person) {
        throw new NotFoundException();
      }

      Object.assign(candidature, {
        ...candidature,
        person,
      });
    }

    if (vacancyId) {
      const vacancy = await this.getOneVacancy.run(vacancyId);

      if (!vacancy) {
        throw new NotFoundException();
      }

      Object.assign(candidature, {
        ...candidature,
        vacancy,
      });
    }

    Object.assign(candidature, {
      ...candidature,
      subscribedAt: subscribedAt ? subscribedAt : candidature.subscribedAt,
    });

    await this.candidatureRepository.save(candidature);

    personId && delete candidature.person;
    vacancyId && delete candidature.vacancy;

    return {
      ...candidature,
    };
  }
}
