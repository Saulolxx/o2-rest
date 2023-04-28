import { Injectable } from '@nestjs/common';
import {
  CreateSegment,
  CreateSegmentProps,
  DeleteOneSegment,
  GetAllSegments,
} from './use-cases';
import { GetOneSegment } from './use-cases/get-one-segment.service';
import { CreateSegmentDto, UpdateSegmentDto } from './dto';
import {
  UpdateSegment,
  UpdateSegmentProps,
} from './use-cases/update-segment.service';

@Injectable()
export class SegmentService {
  constructor(
    private readonly createSegment: CreateSegment,
    private readonly updateSegment: UpdateSegment,
    private readonly getAllSegments: GetAllSegments,
    private readonly getOneSegment: GetOneSegment,
    private readonly deleteOneSegment: DeleteOneSegment,
  ) {}

  async create(createSegmentDto: CreateSegmentDto) {
    const creatSegmentProps: CreateSegmentProps = {
      ...createSegmentDto,
    };
    return await this.createSegment.run(creatSegmentProps);
  }

  async update(id: number, updateSegmentDto: UpdateSegmentDto) {
    const updateSegmentProps: UpdateSegmentProps = {
      id,
      ...updateSegmentDto,
    };
    return await this.updateSegment.run(updateSegmentProps);
  }

  async findAll() {
    return await this.getAllSegments.run();
  }

  async findOne(id: number) {
    return await this.getOneSegment.run(id);
  }

  async deleteOne(id: number) {
    return await this.deleteOneSegment.run(id);
  }
}
