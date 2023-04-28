import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillLevel } from '../entities/skill-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteSkillLevelService {
  constructor(
    @InjectRepository(SkillLevel)
    private skillLevelsRepository: Repository<SkillLevel>,
  ) {}

  public async run(id: number) {
    await this.skillLevelsRepository.delete({ id });
    return;
  }
}
