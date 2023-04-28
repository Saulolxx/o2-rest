import { Module } from '@nestjs/common';
import { SeniorityService } from './seniority.service';
import { SeniorityController } from './seniority.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Seniority } from './entities/seniority.entity';
import {
  CreateSeniorityService,
  DeleteSeniorityService,
  GetAllSeniorityService,
  GetOneByIdSeniorityService,
  UpdateSeniorityService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Seniority])],
  controllers: [SeniorityController],
  providers: [
    SeniorityService,
    CreateSeniorityService,
    GetOneByIdSeniorityService,
    GetAllSeniorityService,
    UpdateSeniorityService,
    DeleteSeniorityService,
  ],
})
export class SeniorityModule {}
