import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdSkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  public async run(id: number) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) throw new NotFoundException();

    return skill;
  }
}
