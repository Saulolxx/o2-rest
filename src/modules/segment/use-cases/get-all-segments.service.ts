import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';

@Injectable()
export class GetAllSegments {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
  ) {}

  public async run() {
    return await this.segmentRepository.find();
  }
}
