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
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interview]), PersonModule],
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
