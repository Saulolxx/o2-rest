import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import {
  CreateSkillService,
  DeleteSkillService,
  GetAllSkillService,
  GetOneByIdSkillService,
  UpdateSkillService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillController],
  providers: [
    CreateSkillService,
    GetOneByIdSkillService,
    GetAllSkillService,
    UpdateSkillService,
    DeleteSkillService,
  ],
  exports: [
    TypeOrmModule,
    CreateSkillService,
    GetOneByIdSkillService,
    GetAllSkillService,
    UpdateSkillService,
    DeleteSkillService,
  ],
})
export class SkillModule {}
