import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePerson, GetAllPersons, GetOnePerson } from './use-cases';
import { PersonController } from './person.controller';
import { DeleteOnePerson } from './use-cases/delete-one-person.service';
import { UpdatePerson } from './use-cases/update-person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [
    PersonService,
    CreatePerson,
    UpdatePerson,
    GetAllPersons,
    GetOnePerson,
    DeleteOnePerson,
  ],
  exports: [TypeOrmModule, PersonService],
})
export class PersonModule {}
