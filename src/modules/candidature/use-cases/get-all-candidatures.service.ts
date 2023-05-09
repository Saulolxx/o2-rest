import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidature } from '../entities/candidature.entity';
import { Repository } from 'typeorm';

export type GetAllCandidatureServiceProps = {
  vacancyId?: number;
  personId?: number;
};

@Injectable()
export class GetAllCandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private candidatureRepository: Repository<Candidature>,
  ) {}

  public run(props?: GetAllCandidatureServiceProps) {
    return this.candidatureRepository.find({
      where: {
        ...(props || {}),
      },
    });
  }
}
