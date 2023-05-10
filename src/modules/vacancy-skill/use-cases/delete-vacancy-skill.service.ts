import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
  ) {}

  public async run(id: number, vacancyId: number) {
    await this.vacanciesSkillsRepository.delete({ id, vacancyId });
    return;
  }
}
