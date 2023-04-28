import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seniority } from '../entities/seniority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateSeniorityService {
  constructor(
    @InjectRepository(Seniority)
    private senioritiesRepository: Repository<Seniority>,
  ) {}

  public async run(id: number, updatedSeniority: Seniority) {
    const seniority = await this.senioritiesRepository.findOneBy({ id });

    if (!seniority) {
      throw new NotFoundException();
    }

    Object.assign(seniority, updatedSeniority);

    return this.senioritiesRepository.save(seniority);
  }
}
