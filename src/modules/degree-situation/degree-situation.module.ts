import { Module } from '@nestjs/common';
import { DegreeSituationController } from './degree-situation.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeSituation } from './entities/degree-situation.entity';
import {
  CreateDegreeSituationService,
  DeleteDegreeSituationService,
  GetAllDegreeSituationService,
  GetOneByIdDegreeSituationService,
  UpdateDegreeSituationService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeSituation])],
  controllers: [DegreeSituationController],
  providers: [
    CreateDegreeSituationService,
    GetOneByIdDegreeSituationService,
    GetAllDegreeSituationService,
    UpdateDegreeSituationService,
    DeleteDegreeSituationService,
  ],
  exports: [
    TypeOrmModule,
    CreateDegreeSituationService,
    GetOneByIdDegreeSituationService,
    GetAllDegreeSituationService,
    UpdateDegreeSituationService,
    DeleteDegreeSituationService,
  ],
})
export class DegreeSituationModule {}
