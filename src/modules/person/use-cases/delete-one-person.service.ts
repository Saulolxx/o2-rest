import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { GetOnePerson } from './get-one-person.service';

@Injectable()
export class DeleteOnePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(id: number) {
    return await this.personRepository.delete({ id });
  }
}
