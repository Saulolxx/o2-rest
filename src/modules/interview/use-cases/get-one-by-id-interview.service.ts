import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
  ) {}

  public async run(id: number) {
    const interview = await this.interviewsRepository.findOneBy({ id });
    if (!interview) throw new NotFoundException();

    return interview;
  }
}
