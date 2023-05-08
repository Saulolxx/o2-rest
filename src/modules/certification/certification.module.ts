import { Module } from '@nestjs/common';
import { CertificationController } from './certification.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import {
  CreateCertificationService,
  DeleteCertificationService,
  GetAllCertificationService,
  GetOneByIdCertificationService,
  UpdateCertificationService,
} from './use-cases';
import { PersonModule } from '../person/person.module';
import { SegmentModule } from '../segment/segment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certification]),
    PersonModule,
    SegmentModule,
  ],
  controllers: [CertificationController],
  providers: [
    CreateCertificationService,
    GetOneByIdCertificationService,
    GetAllCertificationService,
    UpdateCertificationService,
    DeleteCertificationService,
  ],
})
export class CertificationModule {}
