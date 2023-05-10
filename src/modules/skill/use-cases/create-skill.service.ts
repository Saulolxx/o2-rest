import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateSkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  public run(skill: Skill) {
    return this.skillRepository.save(skill);
  }
}
