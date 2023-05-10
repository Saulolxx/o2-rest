import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
  ) {}

  public run(vacancyId: number) {
    return this.vacanciesSkillsRepository.find({
      where: {
        vacancyId,
      },
    });
  }
}
