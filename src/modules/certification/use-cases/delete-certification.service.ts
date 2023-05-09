import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from '../entities/certification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteCertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
  ) {}

  public async run(id: number, personId: number) {
    await this.certificationRepository.delete({ id, personId });
    return;
  }
}
