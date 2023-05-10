import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from '../entities/vacancy-skill.entity';
import { Repository } from 'typeorm';
import { GetOneByIdSkillService } from 'src/modules/skill/use-cases';

export type UpdateVacancySkillProps = {
  id: number;
  vacancyId: number;
  skillId?: number;
};

@Injectable()
export class UpdateVacancySkillService {
  constructor(
    @InjectRepository(VacancySkill)
    private vacanciesSkillsRepository: Repository<VacancySkill>,
    private readonly getOneSkill: GetOneByIdSkillService,
  ) {}

  public async run({ id, vacancyId, skillId }: UpdateVacancySkillProps) {
    const vacancySkill = await this.vacanciesSkillsRepository.findOneBy({
      id,
      vacancyId,
    });

    if (!vacancySkill) {
      throw new NotFoundException();
    }

    const skill = await this.getOneSkill.run(skillId);

    Object.assign(vacancySkill, {
      ...vacancySkill,
      skill,
      skillId,
    });

    await this.vacanciesSkillsRepository.save(vacancySkill);

    delete vacancySkill.vacancy;
    delete vacancySkill.skill;

    return {
      ...vacancySkill,
    };
  }
}
