import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillLevel } from '../entities/skill-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateSkillLevelService {
  constructor(
    @InjectRepository(SkillLevel)
    private skillLevelsRepository: Repository<SkillLevel>,
  ) {}

  public async run(id: number, updatedSkillLevel: SkillLevel) {
    const skillLevel = await this.skillLevelsRepository.findOneBy({ id });

    if (!skillLevel) {
      throw new NotFoundException();
    }

    Object.assign(skillLevel, updatedSkillLevel);

    return this.skillLevelsRepository.save(skillLevel);
  }
}
