import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from '../entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeletePersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private personTypesRepository: Repository<PersonType>,
  ) {}

  public async run(id: number) {
    await this.personTypesRepository.delete({ id });
    return;
  }
}
