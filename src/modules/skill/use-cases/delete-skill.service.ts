import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteSkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  public async run(id: number) {
    await this.skillRepository.delete({ id });
    return;
  }
}
