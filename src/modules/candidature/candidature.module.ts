import { Module, forwardRef } from '@nestjs/common';
import { CandidatureController } from './candidature.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidature } from './entities/candidature.entity';
import {
  CreateCandidatureService,
  DeleteCandidatureService,
  GetAllCandidatureService,
  GetOneByIdCandidatureService,
  UpdateCandidatureService,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { GetOneByIdVacancyService } from '../vacancy/use-cases';
import { Vacancy } from '../vacancy/entities/vacancy.entity';
import { Person } from '../person/entity/person.entity';
import { VacancyModule } from '../vacancy/vacancy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidature, Vacancy, Person]),
    forwardRef(() => PersonModule),
    forwardRef(() => VacancyModule),
  ],
  controllers: [CandidatureController],
  providers: [
    CreateCandidatureService,
    GetOneByIdCandidatureService,
    GetAllCandidatureService,
    UpdateCandidatureService,
    DeleteCandidatureService,
    GetOneByIdVacancyService,
  ],
  exports: [
    CreateCandidatureService,
    GetOneByIdCandidatureService,
    GetAllCandidatureService,
    UpdateCandidatureService,
    DeleteCandidatureService,
  ],
})
export class CandidatureModule {}
