import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seniority } from '../entities/seniority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllSeniorityService {
  constructor(
    @InjectRepository(Seniority)
    private senioritiesRepository: Repository<Seniority>,
  ) {}

  public run() {
    return this.senioritiesRepository.find();
  }
}
