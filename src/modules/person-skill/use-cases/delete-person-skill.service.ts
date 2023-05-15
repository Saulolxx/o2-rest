import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSkill } from '../entities/person-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeletePersonSkillService {
  constructor(
    @InjectRepository(PersonSkill)
    private personsSkillsRepository: Repository<PersonSkill>,
  ) {}

  public async run(id: number, personId: number) {
    await this.personsSkillsRepository.delete({ id, personId });
    return;
  }
}
