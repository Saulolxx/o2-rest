import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from '../entities/degree.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';

@Injectable()
export class GetAllDegreeService {
  constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(personID: number) {
    await this.getOnePerson.run(personID);

    return this.degreesRepository.find({
      where: {
        personID,
      },
    });
  }
}
