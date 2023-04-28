import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillLevel } from '../entities/skill-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateSkillLevelService {
  constructor(
    @InjectRepository(SkillLevel)
    private skillLevelsRepository: Repository<SkillLevel>,
  ) {}

  public run(skillLevel: SkillLevel) {
    return this.skillLevelsRepository.save(skillLevel);
  }
}
