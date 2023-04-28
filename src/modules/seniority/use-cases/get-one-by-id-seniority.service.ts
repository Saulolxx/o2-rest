import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seniority } from '../entities/seniority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdSeniorityService {
  constructor(
    @InjectRepository(Seniority)
    private senioritiesRepository: Repository<Seniority>,
  ) {}

  public async run(id: number) {
    const seniority = await this.senioritiesRepository.findOneBy({ id });
    if (!seniority) throw new NotFoundException();

    return seniority;
  }
}
