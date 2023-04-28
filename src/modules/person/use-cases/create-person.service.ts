import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { UpdatePersonProps } from './update-person.service';

export type CreatePersonProps = Omit<UpdatePersonProps, 'id'>;

@Injectable()
export class CreatePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
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
  }: CreatePersonProps) {
    const person = new Person();

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
      name: name.toLowerCase(),
      email,
      linkedin,
      birthday,
      compleoid,
      phone: phone.replace(/\s+/g, ''),
      country: country && country.toLowerCase(),
      state: state && state.toLowerCase(),
      city: city && city.toLowerCase(),
      redFlag,
      reasonRedFlag,
    });

    await this.personRepository.save(person);

    return person;
  }
}
