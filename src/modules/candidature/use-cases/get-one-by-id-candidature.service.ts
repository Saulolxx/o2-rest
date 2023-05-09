import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidature } from '../entities/candidature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdCandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private candidatureRepository: Repository<Candidature>,
  ) {}

  public async run(id: number) {
    const candidature = await this.candidatureRepository.findOneBy({
      id,
    });
    if (!candidature) throw new NotFoundException();

    return candidature;
  }
}
