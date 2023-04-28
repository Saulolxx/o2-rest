import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { GetOnePerson } from './get-one-person.service';

export type UpdatePersonProps = {
  id: number;
  name?: string;
  email?: string;
  linkedin?: string;
  birthday?: Date;
  compleoid?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  redFlag?: boolean;
  reasonRedFlag?: string;
};

@Injectable()
export class UpdatePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run(updatePersonProps: UpdatePersonProps) {
    if (Object.keys(updatePersonProps).length <= 1) return;

    const {
      id,
      name,
      email,
      linkedin,
      birthday,
      compleoid,
      phone,
      country,
      state,
      city,
      redFlag,
      reasonRedFlag,
    } = updatePersonProps;

    const person = await this.getOnePerson.run(id);

    if (email && email !== person.email) {
      const existingEmail: Person | undefined =
        await this.personRepository.findOne({
          where: {
            email,
          },
        });

      if (existingEmail) throw new BadRequestException('Email already exists!');

      Object.assign(person, {
        ...person,
        email,
      });
    }

    if (phone && phone !== person.phone) {
      const existingPhone: Person | undefined =
        await this.personRepository.findOne({
          where: {
            phone: phone.replace(/\s+/g, ''),
          },
        });

      if (existingPhone) throw new BadRequestException('Phone already exists!');

      Object.assign(person, {
        ...person,
        phone,
      });
    }

    if (redFlag === false && person.reasonRedFlag !== '') {
      Object.assign(person, {
        ...person,
        reasonRedFlag: null,
      });
    }

    Object.assign(person, {
      ...person,
      name: name ? name.toLowerCase() : person.name,
      linkedin: linkedin ? linkedin : person.linkedin,
      birthday: birthday ? birthday : person.birthday,
      compleoid: compleoid ? compleoid : person.compleoid,
      country: country ? country.toLowerCase() : person.country,
      state: state ? state.toLowerCase() : person.state,
      city: city ? city.toLowerCase() : person.city,
      redFlag: redFlag !== undefined ? redFlag : person.redFlag,
      reasonRedFlag: reasonRedFlag ? reasonRedFlag : person.reasonRedFlag,
    });

    this.personRepository.update(id, person);

    return person;
  }
}
