import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';
import { UpdateSegmentProps } from './update-segment.service';

export type CreateSegmentProps = Omit<UpdateSegmentProps, 'id'>;

@Injectable()
export class CreateSegment {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
  ) {}

  public async run({ name }: CreateSegmentProps) {
    const existingSegment: Segment | undefined =
      await this.segmentRepository.findOne({
        where: {
          name,
        },
      });

    if (existingSegment)
      throw new BadRequestException('Segment name already exists!');

    const segment = new Segment();
    Object.assign(segment, {
      name,
    });

    await this.segmentRepository.save(segment);
    return segment;
  }
}
