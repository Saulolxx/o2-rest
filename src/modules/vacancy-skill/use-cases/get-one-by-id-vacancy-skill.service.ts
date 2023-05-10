import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
  ) {}

  public async run(id: number, vacancyId: number) {
    const vacancySkill = await this.vacanciesSkillsRepository.findOneBy({
      id,
      vacancyId,
    });
    if (!vacancySkill) throw new NotFoundException();

    return vacancySkill;
  }
}
