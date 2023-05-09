import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from '../entities/degree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteDegreeService {
  constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
  ) {}

  public async run(id: number, personID: number) {
    await this.degreesRepository.delete({ id, personID });
    return;
  }
}
