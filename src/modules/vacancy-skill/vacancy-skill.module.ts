import { Module } from '@nestjs/common';
import { VacancySkillController } from './vacancy-skill.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancySkill } from './entities/vacancy-skill.entity';
import {
  CreateVacancySkillService,
  DeleteVacancySkillService,
  GetAllVacancySkillService,
  GetOneByIdVacancySkillService,
  UpdateVacancySkillService,
} from './use-cases';
import { VacancyModule } from '../vacancy/vacancy.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacancySkill]),
    VacancyModule,
    SkillModule,
  ],
  controllers: [VacancySkillController],
  providers: [
    CreateVacancySkillService,
    GetOneByIdVacancySkillService,
    GetAllVacancySkillService,
    UpdateVacancySkillService,
    DeleteVacancySkillService,
  ],
})
export class VacancySkillModule {}
