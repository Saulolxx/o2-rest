import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSkill } from '../entities/person-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdPersonSkillService {
  constructor(
    @InjectRepository(PersonSkill)
    private personsSkillsRepository: Repository<PersonSkill>,
  ) {}

  public async run(id: number, personId: number) {
    const personSkill = await this.personsSkillsRepository.findOneBy({
      id,
      personId,
    });
    if (!personSkill) throw new NotFoundException();

    return personSkill;
  }
}
