import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from '../entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllPersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private personTypesRepository: Repository<PersonType>,
  ) {}

  public run() {
    return this.personTypesRepository.find();
  }
}
