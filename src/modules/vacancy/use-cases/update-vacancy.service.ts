import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { Repository } from 'typeorm';

export type UpdateVacancyProps = {
  id: number;
  title?: string;
  compleoid?: string;
  description?: string;
};

@Injectable()
export class UpdateVacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  public async run({ id, title, compleoid, description }: UpdateVacancyProps) {
    const vacancy = await this.vacanciesRepository.findOneBy({ id });

    if (!vacancy) {
      throw new NotFoundException();
    }

    Object.assign(vacancy, {
      ...vacancy,
      title: title ? title : vacancy.title,
      compleoid:
        compleoid || compleoid === null ? compleoid : vacancy.compleoid,
      description:
        description || description === null ? description : vacancy.description,
    });

    return this.vacanciesRepository.save(vacancy);
  }
}
