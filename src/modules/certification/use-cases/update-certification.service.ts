import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from '../entities/certification.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneSegment } from 'src/modules/segment/use-cases'; //service?

export type UpdateCertificationProps = {
  id: number;
  personId?: number;
  segmentId?: number;
  title?: string;
  issuance?: Date;
  educationInstitution?: string;
  expiration?: Date;
};

@Injectable()
export class UpdateCertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOneSegment: GetOneSegment,
  ) {}

  public async run({
    id,
    personId,
    segmentId,
    title,
    issuance,
    educationInstitution,
    expiration,
  }: UpdateCertificationProps) {
    const certification = await this.certificationRepository.findOneBy({
      id,
      personId,
    });

    if (!certification) {
      throw new NotFoundException();
    }

    if (segmentId) {
      const segment = await this.getOneSegment.run(segmentId);

      Object.assign(certification, {
        ...certification,
        segment,
      });
    }

    Object.assign(certification, {
      ...certification,
      title: title ? title : certification.title,
      issuance: issuance ? issuance : certification.issuance,
      educationInstitution: educationInstitution
        ? educationInstitution
        : certification.educationInstitution,
      expiration: expiration ? expiration : certification.expiration,
    });

    await this.certificationRepository.save(certification);

    delete certification.segment;

    return {
      ...certification,
      personId: certification.personId,
      segmentId: certification.segmentId,
    };
  }
}
