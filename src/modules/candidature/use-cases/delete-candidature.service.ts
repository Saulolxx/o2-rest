import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidature } from '../entities/candidature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteCandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private candidatureRepository: Repository<Candidature>,
  ) {}

  public async run(id: number) {
    await this.candidatureRepository.delete({ id });
    return;
  }
}
