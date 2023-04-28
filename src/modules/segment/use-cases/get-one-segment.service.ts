import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';

@Injectable()
export class GetOneSegment {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
  ) {}

  public async run(id: number) {
    const segment = await this.segmentRepository.findOne({
      where: {
        id,
      },
    });

    if (!segment) throw new NotFoundException('Segment has not been found.');

    return segment;
  }
}
