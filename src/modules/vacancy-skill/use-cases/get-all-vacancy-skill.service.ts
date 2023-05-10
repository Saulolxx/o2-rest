import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';
import { GetOneByIdVacancyService } from 'src/modules/vacancy/use-cases';

@Injectable()
export class GetAllVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
    private readonly getOneVacancy: GetOneByIdVacancyService,
  ) {}

  public async run(vacancyId: number) {
    await this.getOneVacancy.run(vacancyId);

    const vacanciesSkills = await this.vacanciesSkillsRepository.find({
      where: {
        vacancyId,
      },
    });

    if (!vacanciesSkills.length)
      throw new NotFoundException('No vacancies skilss found');

    return vacanciesSkills;
  }
}
