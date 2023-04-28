import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seniority } from '../entities/seniority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteSeniorityService {
  constructor(
    @InjectRepository(Seniority)
    private senioritiesRepository: Repository<Seniority>,
  ) {}

  public async run(id: number) {
    await this.senioritiesRepository.delete({ id });
    return;
  }
}
