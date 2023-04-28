import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class GetAllPersons {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  public async run() {
    return await this.personRepository.find();
  }
}
