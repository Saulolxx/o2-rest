import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from '../entities/certification.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneSegment } from 'src/modules/segment/use-cases'; //service?

export type CreateCertificationProps = {
  personId?: number;
  segmentId?: number;
  title: string;
  issuance: Date;
  educationInstitution?: string;
  expiration?: Date;
};

@Injectable()
export class CreateCertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneSegment: GetOneSegment,
  ) {}

  public async run({
    personId,
    segmentId,
    title,
    issuance,
    educationInstitution,
    expiration,
  }: CreateCertificationProps) {
    const certification = new Certification();

    const person = await this.getOnePerson.run(personId);

    if (segmentId) {
      const segment = await this.getOneSegment.run(segmentId);

      Object.assign(certification, {
        ...certification,
        segment,
      });
    }

    Object.assign(certification, {
      ...certification,
      title,
      issuance,
      educationInstitution,
      expiration,
      person,
    });

    await this.certificationRepository.save(certification);

    delete certification.person;
    delete certification.segment;

    return {
      ...certification,
      personId,
      segmentId,
    };
  }
}
