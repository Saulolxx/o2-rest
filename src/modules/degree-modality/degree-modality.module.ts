import { Module } from '@nestjs/common';
import { DegreeModalityController } from './degree-modality.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeModality } from './entities/degree-modality.entity';
import {
  CreateDegreeModalityService,
  DeleteDegreeModalityService,
  GetAllDegreeModalityService,
  GetOneByIdDegreeModalityService,
  UpdateDegreeModalityService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeModality])],
  controllers: [DegreeModalityController],
  providers: [
    CreateDegreeModalityService,
    GetOneByIdDegreeModalityService,
    GetAllDegreeModalityService,
    UpdateDegreeModalityService,
    DeleteDegreeModalityService,
  ],
  exports: [
    TypeOrmModule,
    CreateDegreeModalityService,
    GetOneByIdDegreeModalityService,
    GetAllDegreeModalityService,
    UpdateDegreeModalityService,
    DeleteDegreeModalityService,
  ],
})
export class DegreeModalityModule {}
