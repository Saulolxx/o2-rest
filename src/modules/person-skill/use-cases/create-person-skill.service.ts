import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSkill } from '../entities/person-skill.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { GetOneByIdSkillService } from 'src/modules/skill/use-cases';

export type CreatePersonSkillProps = {
  personId: number;
  skillId: number;
};

@Injectable()
export class CreatePersonSkillService {
  constructor(
    @InjectRepository(PersonSkill)
    private personsSkillsRepository: Repository<PersonSkill>,
    private getOnePerson: GetOnePerson,
    private getOneSkill: GetOneByIdSkillService,
  ) {}

  public async run({ personId, skillId }: CreatePersonSkillProps) {
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

    const person = await this.getOnePerson.run(personId);
    const skill = await this.getOneSkill.run(skillId);

    const personSkill = new PersonSkill();

    Object.assign(personSkill, {
      person,
      skill,
    });

    await this.personsSkillsRepository.save(personSkill);

    delete personSkill.person;
    delete personSkill.skill;

    return {
      ...personSkill,
    };
  }
}
