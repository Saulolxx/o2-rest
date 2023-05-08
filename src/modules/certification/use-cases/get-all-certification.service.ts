import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from '../entities/certification.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';

@Injectable()
export class GetAllCertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(personId: number) {
    await this.getOnePerson.run(personId);

    return this.certificationRepository.find({
      where: {
        personId,
      },
    });
  }
}
