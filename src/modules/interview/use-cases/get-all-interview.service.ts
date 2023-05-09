import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
  ) {}

  public run() {
    return this.interviewsRepository.find();
  }
}
