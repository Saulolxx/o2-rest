import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllVacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  public run() {
    return this.vacanciesRepository.find();
  }
}
