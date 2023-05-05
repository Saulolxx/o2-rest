import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from '../entities/degree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdDegreeService {
  constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
  ) {}

  public async run(id: number, personID: number) {
    const degree = await this.degreesRepository.findOneBy({ id, personID });
    if (!degree) throw new NotFoundException();

    return degree;
  }
}
