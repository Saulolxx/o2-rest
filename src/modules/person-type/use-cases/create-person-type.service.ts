import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from '../entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private personTypesRepository: Repository<PersonType>,
  ) {}

  public run(personType: PersonType) {
    return this.personTypesRepository.save(personType);
  }
}
