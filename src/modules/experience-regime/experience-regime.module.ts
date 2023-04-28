import { Module } from '@nestjs/common';
import { ExperienceRegimeController } from './experience-regime.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceRegime } from './entities/experience-regime.entity';
import {
  CreateExperienceRegimeService,
  DeleteExperienceRegimeService,
  GetAllExperienceRegimeService,
  GetOneByIdExperienceRegimeService,
  UpdateExperienceRegimeService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceRegime])],
  controllers: [ExperienceRegimeController],
  providers: [
    CreateExperienceRegimeService,
    GetOneByIdExperienceRegimeService,
    GetAllExperienceRegimeService,
    UpdateExperienceRegimeService,
    DeleteExperienceRegimeService,
  ],
})
export class ExperienceRegimeModule {}
