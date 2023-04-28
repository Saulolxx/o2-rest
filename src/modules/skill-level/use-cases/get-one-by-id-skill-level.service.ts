import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillLevel } from '../entities/skill-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdSkillLevelService {
  constructor(
    @InjectRepository(SkillLevel)
    private skillLevelsRepository: Repository<SkillLevel>,
  ) {}

  public async run(id: number) {
    const skillLevel = await this.skillLevelsRepository.findOneBy({ id });
    if (!skillLevel) throw new NotFoundException();

    return skillLevel;
  }
}
