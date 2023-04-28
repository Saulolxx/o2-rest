import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class DeleteOnePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  public async run(id: number) {
    return await this.personRepository.delete({ id });
  }
}
