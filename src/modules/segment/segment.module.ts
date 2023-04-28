import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './entity/segment.entity';
import { SegmentService } from './segment.service';
import { CreateSegment, GetAllSegments, GetOneSegment } from './use-cases';
import { SegmentController } from './segment.controller';
import { DeleteOneSegment } from './use-cases/delete-one-segment.service';
import { UpdateSegment } from './use-cases/update-segment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Segment])],
  controllers: [SegmentController],
  providers: [
    SegmentService,
    CreateSegment,
    UpdateSegment,
    GetAllSegments,
    GetOneSegment,
    DeleteOneSegment,
  ],
  exports: [TypeOrmModule, SegmentService],
})
export class SegmentModule {}
