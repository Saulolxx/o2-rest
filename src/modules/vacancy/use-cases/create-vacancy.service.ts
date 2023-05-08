import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { Repository } from 'typeorm';

export type CreateVacancyProps = {
  title: string;
  compleoid?: string;
  description?: string;
};

@Injectable()
export class CreateVacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  public run({ title, compleoid, description }: CreateVacancyProps) {
    const vacancy = new Vacancy();

    Object.assign(vacancy, {
      title,
      compleoid,
      description,
    });

    return this.vacanciesRepository.save(vacancy);
  }
}
