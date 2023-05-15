import { Module } from '@nestjs/common';
import { PersonSkillController } from './person-skill.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonSkill } from './entities/person-skill.entity';
import {
  CreatePersonSkillService,
  DeletePersonSkillService,
  GetAllPersonSkillService,
  GetOneByIdPersonSkillService,
  UpdatePersonSkillService,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonSkill]), PersonModule, SkillModule],
  controllers: [PersonSkillController],
  providers: [
    CreatePersonSkillService,
    GetOneByIdPersonSkillService,
    GetAllPersonSkillService,
    UpdatePersonSkillService,
    DeletePersonSkillService,
  ],
})
export class PersonSkillModule {}
