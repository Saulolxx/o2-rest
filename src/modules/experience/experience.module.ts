import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import {
  CreateExperienceService,
  DeleteExperienceService,
  GetAllExperienceService,
  GetOneByIdExperienceService,
  UpdateExperienceService,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { ExperienceModalityModule } from '../experience-modality/experience-modality.module';
import { ExperienceRegimeModule } from '../experience-regime/experience-regime.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
    PersonModule,
    ExperienceModalityModule,
    ExperienceRegimeModule,
    CurrencyModule,
  ],
  controllers: [ExperienceController],
  providers: [
    CreateExperienceService,
    GetOneByIdExperienceService,
    GetAllExperienceService,
    UpdateExperienceService,
    DeleteExperienceService,
  ],
})
export class ExperienceModule {}
