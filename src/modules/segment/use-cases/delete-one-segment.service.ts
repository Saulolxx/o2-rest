import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';
import { GetOneSegment } from './get-one-segment.service';

@Injectable()
export class DeleteOneSegment {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
    private readonly getOneSegment: GetOneSegment,
  ) {}

  public async run(id: number) {
    await this.getOneSegment.run(id);

    return await this.segmentRepository.delete({ id });
  }
}
