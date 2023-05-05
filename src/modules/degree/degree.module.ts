import { Module } from '@nestjs/common';
import { DegreeController } from './degree.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Degree } from './entities/degree.entity';
import {
  CreateDegreeService,
  DeleteDegreeService,
  GetAllDegreeService,
  GetOneByIdDegreeService,
  UpdateDegreeService,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { DegreeModality } from '../degree-modality/entities/degree-modality.entity';
import { DegreeSituation } from '../degree-situation/entities/degree-situation.entity';
import { DegreeModalityModule } from '../degree-modality/degree-modality.module';
import { DegreeSituationModule } from '../degree-situation/degree-situation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Degree]),
    PersonModule,
    DegreeModalityModule,
    DegreeSituationModule,
  ],
  controllers: [DegreeController],
  providers: [
    CreateDegreeService,
    GetOneByIdDegreeService,
    GetAllDegreeService,
    UpdateDegreeService,
    DeleteDegreeService,
  ],
})
export class DegreeModule {}
