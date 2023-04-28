import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillLevel } from '../entities/skill-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllSkillLevelService {
  constructor(
    @InjectRepository(SkillLevel)
    private skillLevelsRepository: Repository<SkillLevel>,
  ) {}

  public run() {
    return this.skillLevelsRepository.find();
  }
}
