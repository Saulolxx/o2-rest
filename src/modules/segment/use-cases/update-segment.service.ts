import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entity/segment.entity';
import { GetOneSegment } from './get-one-segment.service';

export type UpdateSegmentProps = {
  id: number;
  name: string;
};

@Injectable()
export class UpdateSegment {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
    private readonly getOneSegment: GetOneSegment,
  ) {}

  public async run({ id, name }: UpdateSegmentProps) {
    const segment = await this.getOneSegment.run(id);

    if (name !== segment.name) {
      const existingSegment: Segment | undefined =
        await this.segmentRepository.findOne({
          where: {
            name,
          },
        });

      if (existingSegment)
        throw new BadRequestException('Segment name already exists!');
    }

    Object.assign(segment, {
      ...segment,
      name,
    });
    await this.segmentRepository.save(segment);
    return segment;
  }
}
