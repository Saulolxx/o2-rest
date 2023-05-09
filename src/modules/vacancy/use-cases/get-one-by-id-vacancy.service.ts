import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdVacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  public async run(id: number) {
    const vacancy = await this.vacanciesRepository.findOneBy({ id });
    if (!vacancy) throw new NotFoundException();

    return vacancy;
  }
}
