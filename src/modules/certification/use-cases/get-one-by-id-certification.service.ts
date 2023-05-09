import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from '../entities/certification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdCertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
  ) {}

  public async run(id: number, personId: number) {
    const certification = await this.certificationRepository.findOneBy({
      id,
      personId,
    });
    if (!certification) throw new NotFoundException();

    return certification;
  }
}
