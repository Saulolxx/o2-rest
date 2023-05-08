import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [
    CreateVacancyService,
    GetOneByIdVacancyService,
    GetAllVacancyService,
    UpdateVacancyService,
    DeleteVacancyService,
  ],
})
export class VacancyModule {}
