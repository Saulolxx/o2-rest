import { Module } from '@nestjs/common';
import { SkillLevelController } from './skill-level.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillLevel } from './entities/skill-level.entity';
import {
  CreateSkillLevelService,
  DeleteSkillLevelService,
  GetAllSkillLevelService,
  GetOneByIdSkillLevelService,
  UpdateSkillLevelService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([SkillLevel])],
  controllers: [SkillLevelController],
  providers: [
    CreateSkillLevelService,
    GetOneByIdSkillLevelService,
    GetAllSkillLevelService,
    UpdateSkillLevelService,
    DeleteSkillLevelService,
  ],
})
export class SkillLevelModule {}
