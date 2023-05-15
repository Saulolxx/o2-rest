import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSkill } from '../entities/person-skill.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';

@Injectable()
export class GetAllPersonSkillService {
  constructor(
    @InjectRepository(PersonSkill)
    private personsSkillsRepository: Repository<PersonSkill>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(personId: number) {
    await this.getOnePerson.run(personId);

    const personsSkills = await this.personsSkillsRepository.find({
      where: {
        personId,
      },
    });

    if (!personsSkills.length)
      throw new NotFoundException('No persons skills found');

    return personsSkills;
  }
}
