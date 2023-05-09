import { Module, forwardRef } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import {
  CreateVacancyService,
  DeleteVacancyService,
  GetAllVacancyService,
  GetOneByIdVacancyService,
  UpdateVacancyService,
} from './use-cases';
import { CandidatureModule } from '../candidature/candidature.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    forwardRef(() => CandidatureModule),
  ],
  controllers: [VacancyController],
  providers: [
    CreateVacancyService,
    GetOneByIdVacancyService,
    GetAllVacancyService,
    UpdateVacancyService,
    DeleteVacancyService,
  ],
  exports: [
    TypeOrmModule,
    CreateVacancyService,
    GetOneByIdVacancyService,
    GetAllVacancyService,
    UpdateVacancyService,
    DeleteVacancyService,
  ],
})
export class VacancyModule {}
