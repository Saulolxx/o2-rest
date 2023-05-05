import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from '../entities/degree.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneByIdDegreeModalityService } from 'src/modules/degree-modality/use-cases';
import { GetOneByIdDegreeSituationService } from 'src/modules/degree-situation/use-cases';

export type CreateDegreeProps = {
  title: string;
  educationInstitution: string;
  startedAt: Date;
  finishedAt: Date;
  personID: number;
  degreeModalityID: number;
  degreeSituationID: number;
};

@Injectable()
export class CreateDegreeService {
  constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneDegreeModality: GetOneByIdDegreeModalityService,
    private readonly getOneDegreeSituation: GetOneByIdDegreeSituationService,
  ) {}

  public async run({
    title,
    educationInstitution,
    startedAt,
    finishedAt,
    personID,
    degreeModalityID,
    degreeSituationID,
  }: CreateDegreeProps) {
    const person = await this.getOnePerson.run(personID);

    const degree = new Degree();

    if (degreeModalityID) {
      const degreeModality = await this.getOneDegreeModality.run(
        degreeModalityID,
      );

      Object.assign(degree, {
        ...degree,
        degreeModality,
      });
    }

    if (degreeSituationID) {
      const degreeSituation = await this.getOneDegreeSituation.run(
        degreeSituationID,
      );

      Object.assign(degree, {
        ...degree,
        degreeSituation,
      });
    }

    Object.assign(degree, {
      ...degree,
      title,
      educationInstitution,
      startedAt,
      finishedAt,
      person,
    });

    await this.degreesRepository.save(degree);

    delete degree.person;
    delete degree.degreeModality;
    delete degree.degreeSituation;

    return degree;
  }
}
