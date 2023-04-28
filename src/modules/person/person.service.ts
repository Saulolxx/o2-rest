import { Injectable } from '@nestjs/common';
import {
  CreatePerson,
  CreatePersonProps,
  DeleteOnePerson,
  GetAllPersons,
} from './use-cases';
import { GetOnePerson } from './use-cases/get-one-person.service';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import {
  UpdatePerson,
  UpdatePersonProps,
} from './use-cases/update-person.service';

@Injectable()
export class PersonService {
  constructor(
    private readonly createPerson: CreatePerson,
    private readonly updatePerson: UpdatePerson,
    private readonly getAllPersons: GetAllPersons,
    private readonly getOnePerson: GetOnePerson,
    private readonly deleteOnePerson: DeleteOnePerson,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const creatPersonProps: CreatePersonProps = {
      ...createPersonDto,
    };
    return await this.createPerson.run(creatPersonProps);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const updatePersonProps: UpdatePersonProps = {
      id,
      ...updatePersonDto,
    };
    return await this.updatePerson.run(updatePersonProps);
  }

  async findAll() {
    return await this.getAllPersons.run();
  }

  async findOne(id: number) {
    return await this.getOnePerson.run(id);
  }

  async deleteOne(id: number) {
    return await this.deleteOnePerson.run(id);
  }
}
