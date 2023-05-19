import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { UpdatePersonProps } from './update-person.service';
import { GetOneByIdPersonTypeService } from 'src/modules/person-type/use-cases';

export type CreatePersonProps = Omit<UpdatePersonProps, 'id'>;

@Injectable()
export class CreatePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private readonly getOnePersonType: GetOneByIdPersonTypeService,
  ) {}

  public async run({
    name,
    email,
    linkedin,
    birthday,
    compleoid,
    phone,
    country,
    state,
    city,
    redFlag = false,
    reasonRedFlag,
    personTypeId,
  }: CreatePersonProps) {
    const person = new Person();

    const personType = await this.getOnePersonType.run(personTypeId);

    const existingEmail: Person | undefined =
      await this.personRepository.findOne({
        where: {
          email,
        },
      });

    if (existingEmail) throw new BadRequestException('Email alread exists!');

    const existingPhone: Person | undefined =
      await this.personRepository.findOne({
        where: {
          phone: phone.replace(/\s+/g, ''),
        },
      });

    if (existingPhone) throw new BadRequestException('Phone alread exists!');

    Object.assign(person, {
      name,
      email,
      linkedin,
      birthday,
      compleoid,
      phone: phone.replace(/\s+/g, ''),
      country,
      state,
      city,
      redFlag,
      reasonRedFlag,
      personType,
    });

    await this.personRepository.save(person);

    return person;
  }
}
