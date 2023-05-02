import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneByIdExperienceModalityService } from 'src/modules/experience-modality/use-cases';
import { GetOneByIdExperienceRegimeService } from 'src/modules/experience-regime/use-cases';
import { GetOneByIdCurrencyService } from 'src/modules/currency/use-cases';

export type CreateExperienceProps = {
  company: string;
  role: string;
  description: string;
  salary: number;
  startDate: Date;
  endDate?: Date;
  personID: number;
  experienceModalityID?: number;
  experienceRegimeID?: number;
  currencyID?: number;
};

@Injectable()
export class CreateExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneExperienceModality: GetOneByIdExperienceModalityService,
    private readonly getOneExperienceRegime: GetOneByIdExperienceRegimeService,
    private readonly getOneCurrency: GetOneByIdCurrencyService,
  ) {}

  public async run({
    company,
    role,
    description,
    salary,
    startDate,
    endDate,
    personID,
    experienceModalityID,
    experienceRegimeID,
    currencyID,
  }: CreateExperienceProps) {
    const experience = new Experience();

    const person = await this.getOnePerson.run(personID);

    if (experienceModalityID) {
      const experienceModality = await this.getOneExperienceModality.run(
        experienceModalityID,
      );

      Object.assign(experience, {
        ...experience,
        experienceModality,
      });
    }

    if (experienceRegimeID) {
      const experienceRegime = await this.getOneExperienceRegime.run(
        experienceRegimeID,
      );

      Object.assign(experience, {
        ...experience,
        experienceRegime,
      });
    }

    if (currencyID) {
      const currency = await this.getOneCurrency.run(currencyID);

      Object.assign(experience, {
        ...experience,
        currency,
      });
    }

    Object.assign(experience, {
      ...experience,
      company,
      role,
      description,
      salary,
      startDate,
      endDate,
      person,
    });

    await this.experiencesRepository.save(experience);

    delete experience.person;
    delete experience.experienceModality;
    delete experience.experienceRegime;
    delete experience.currency;

    return {
      ...experience,
      personID,
      experienceModalityID,
      experienceRegimeID,
      currencyID,
    };
  }
}
