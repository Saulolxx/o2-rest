import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllSkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  public run() {
    return this.skillRepository.find();
  }
}
