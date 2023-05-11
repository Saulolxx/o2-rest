import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSkill } from '../entities/person-skill.entity';
import { Repository } from 'typeorm';
import { GetOneByIdSkillService } from 'src/modules/skill/use-cases';

export type UpdatePersonSkillProps = {
  id: number;
  personId: number;
  skillId?: number;
};

@Injectable()
export class UpdatePersonSkillService {
  constructor(
    @InjectRepository(PersonSkill)
    private personsSkillsRepository: Repository<PersonSkill>,
    private readonly getOneSkill: GetOneByIdSkillService,
  ) {}

  public async run({ id, personId, skillId }: UpdatePersonSkillProps) {
    const personSkill = await this.personsSkillsRepository.findOneBy({
      id,
      personId,
    });

    if (!personSkill) {
      throw new NotFoundException();
    }

    const [existingPersonSkill] = await this.personsSkillsRepository.find({
      where: {
        personId,
        skillId,
      },
    });

    if (existingPersonSkill) {
      delete existingPersonSkill.person;
      delete existingPersonSkill.skill;

      return {
        ...existingPersonSkill,
      };
    }

    const skill = await this.getOneSkill.run(skillId);

    Object.assign(personSkill, {
      ...personSkill,
      skill,
      skillId,
    });

    await this.personsSkillsRepository.save(personSkill);

    delete personSkill.person;
    delete personSkill.skill;

    return {
      ...personSkill,
    };
  }
}
