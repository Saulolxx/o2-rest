import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from '../entities/degree.entity';
import { Repository } from 'typeorm';
import { GetOneByIdDegreeModalityService } from 'src/modules/degree-modality/use-cases';
import { GetOneByIdDegreeSituationService } from 'src/modules/degree-situation/use-cases';

export type UpdateDegreeProps = {
  id: number;
  title?: string;
  educationInstitution?: string;
  startedAt?: Date;
  finishedAt?: Date;
  personID: number;
  degreeModalityID?: number;
  degreeSituationID?: number;
};

@Injectable()
export class UpdateDegreeService {
  constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
    private readonly getOneDegreeModality: GetOneByIdDegreeModalityService,
    private readonly getOneDegreeSituation: GetOneByIdDegreeSituationService,
  ) {}

  public async run({
    id,
    title,
    educationInstitution,
    startedAt,
    finishedAt,
    personID,
    degreeModalityID,
    degreeSituationID,
  }: UpdateDegreeProps) {
    const degree = await this.degreesRepository.findOneBy({ id, personID });

    if (!degree) {
      throw new NotFoundException();
    }

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
      title: title ? title : degree.title,
      educationInstitution: educationInstitution
        ? educationInstitution
        : degree.educationInstitution,

      startedAt: startedAt ? startedAt : degree.startedAt,

      finishedAt:
        finishedAt || finishedAt === null ? finishedAt : degree.finishedAt,

      degreeModality: degreeModalityID === null ? null : degree.degreeModality,

      degreeSituation:
        degreeSituationID === null ? null : degree.degreeSituation,
    });

    await this.degreesRepository.save(degree);

    delete degree.person;
    delete degree.degreeModality;
    delete degree.degreeSituation;

    return degree;
  }
}
