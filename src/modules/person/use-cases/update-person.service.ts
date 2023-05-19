import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';
import { GetOnePerson } from './get-one-person.service';
import { GetOneByIdPersonTypeService } from 'src/modules/person-type/use-cases';

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
  personTypeId?: number;
};

@Injectable()
export class UpdatePerson {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private readonly getOnePerson: GetOnePerson,
    private readonly getOnePersonType: GetOneByIdPersonTypeService,
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
      personTypeId,
    } = updatePersonProps;

    const person = await this.getOnePerson.run(id);

    if (personTypeId) {
      const personType = await this.getOnePersonType.run(personTypeId);

      Object.assign(person, {
        ...person,
        personType,
        personTypeId,
      });
    }

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
      name: name ? name : person.name,
      linkedin: linkedin ? linkedin : person.linkedin,
      birthday: birthday ? birthday : person.birthday,
      compleoid: compleoid ? compleoid : person.compleoid,
      country: country ? country : person.country,
      state: state ? state : person.state,
      city: city ? city : person.city,
      redFlag: redFlag !== undefined ? redFlag : person.redFlag,
      reasonRedFlag: reasonRedFlag ? reasonRedFlag : person.reasonRedFlag,
    });

    await this.personRepository.update(id, person);

    delete person.personType;

    return person;
  }
}
