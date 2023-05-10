import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateSkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  public async run(id: number, updatedSkill: Skill) {
    const skill = await this.skillRepository.findOneBy({ id });

    if (!skill) {
      throw new NotFoundException();
    }

    Object.assign(skill, updatedSkill);

    return this.skillRepository.save(skill);
  }
}
