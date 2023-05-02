import { Module } from '@nestjs/common';
import { ExperienceModalityController } from './experience-modality.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceModality } from './entities/experience-modality.entity';
import {
  CreateExperienceModalityService,
  DeleteExperienceModalityService,
  GetAllExperienceModalityService,
  GetOneByIdExperienceModalityService,
  UpdateExperienceModalityService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceModality])],
  controllers: [ExperienceModalityController],
  providers: [
    CreateExperienceModalityService,
    GetOneByIdExperienceModalityService,
    GetAllExperienceModalityService,
    UpdateExperienceModalityService,
    DeleteExperienceModalityService,
  ],
})
export class ExperienceModalityModule {}
