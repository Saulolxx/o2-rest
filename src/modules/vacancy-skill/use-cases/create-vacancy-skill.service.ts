import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';
import { GetOneByIdVacancyService } from 'src/modules/vacancy/use-cases';
import { GetOneByIdSkillService } from 'src/modules/skill/use-cases';

export type CreateVacancySkillProps = {
  vacancyId: number;
  skillId: number;
};

@Injectable()
export class CreateVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
    private getOneVacancy: GetOneByIdVacancyService,
    private getOneSkill: GetOneByIdSkillService,
  ) {}

  public async run({ vacancyId, skillId }: CreateVacancySkillProps) {
    const [existingVacancySkill] = await this.vacanciesSkillsRepository.find({
      where: {
        vacancyId,
        skillId,
      },
    });

    if (existingVacancySkill) {
      delete existingVacancySkill.vacancy;
      delete existingVacancySkill.skill;

      return {
        ...existingVacancySkill,
      };
    }

    const vacancy = await this.getOneVacancy.run(vacancyId);
    const skill = await this.getOneSkill.run(skillId);

    const vacancySkill = new VacancySkill();

    Object.assign(vacancySkill, {
      vacancy,
      skill,
    });

    await this.vacanciesSkillsRepository.save(vacancySkill);

    delete vacancySkill.vacancy;
    delete vacancySkill.skill;

    return {
      ...vacancySkill,
    };
  }
}
