import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneByIdExperienceModalityService } from 'src/modules/experience-modality/use-cases';
import { GetOneByIdExperienceRegimeService } from 'src/modules/experience-regime/use-cases';
import { GetOneByIdCurrencyService } from 'src/modules/currency/use-cases';

export type UpdateExperienceProps = {
  id: number;
  company?: string;
  role?: string;
  description?: string;
  salary?: number;
  startDate?: Date;
  endDate?: Date;
  personID?: number;
  experienceModalityID?: number;
  experienceRegimeID?: number;
  currencyID?: number;
};

@Injectable()
export class UpdateExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneExperienceModality: GetOneByIdExperienceModalityService,
    private readonly getOneExperienceRegime: GetOneByIdExperienceRegimeService,
    private readonly getOneCurrency: GetOneByIdCurrencyService,
  ) {}

  public async run({
    id,
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
  }: UpdateExperienceProps) {
    const experience = await this.experiencesRepository.findOneBy({
      id,
      personID,
    });

    if (!experience) {
      throw new NotFoundException();
    }

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
      company: company ? company : experience.company,
      role: role ? role : experience.role,
      description: description ? description : experience.description,
      salary: salary >= 0 ? salary : experience.salary,
      startDate: startDate ? startDate : experience.startDate,
      endDate: endDate || endDate === null ? endDate : experience.endDate,
    });

    await this.experiencesRepository.save(experience);

    delete experience.experienceModality;
    delete experience.experienceRegime;
    delete experience.currency;

    return {
      ...experience,
      personID: experience.personID,
      experienceModalityID: experience.experienceModalityID,
      experienceRegimeID: experience.experienceRegimeID,
      currencyID: experience.currencyID,
    };
  }
}
