import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';

@Injectable()
export class DeleteOneSegment {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
  ) {}

  public async run(id: number) {
    return await this.segmentRepository.delete({ id });
  }
}
