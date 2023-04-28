import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class GetOnePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  public async run(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });

    if (!person) throw new NotFoundException('Person has not been found.');

    return person;
  }
}
