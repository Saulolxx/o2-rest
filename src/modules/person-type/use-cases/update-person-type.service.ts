import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonType } from '../entities/person-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdatePersonTypeService {
  constructor(
    @InjectRepository(PersonType)
    private personTypesRepository: Repository<PersonType>,
  ) {}

  public async run(id: number, updatedPersonType: PersonType) {
    const personType = await this.personTypesRepository.findOneBy({ id });

    if (!personType) {
      throw new NotFoundException();
    }

    Object.assign(personType, updatedPersonType);

    return this.personTypesRepository.save(personType);
  }
}
