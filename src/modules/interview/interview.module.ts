import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';
import {
  CreateInterviewService,
  DeleteInterviewService,
  GetAllInterviewService,
  GetOneByIdInterviewService,
  UpdateInterviewService,
} from './use-cases';
import { CandidatureModule } from '../candidature/candidature.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interview]), CandidatureModule],
  controllers: [InterviewController],
  providers: [
    CreateInterviewService,
    GetOneByIdInterviewService,
    GetAllInterviewService,
    UpdateInterviewService,
    DeleteInterviewService,
  ],
})
export class InterviewModule {}
