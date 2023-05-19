import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { PersonService } from './person.service';
import { CreatePerson, GetAllPersons, GetOnePerson } from './use-cases';
import { PersonController } from './person.controller';
import { DeleteOnePerson } from './use-cases/delete-one-person.service';
import { UpdatePerson } from './use-cases/update-person.service';
import { CandidatureModule } from '../candidature/candidature.module';
import { PersonTypeModule } from '../person-type/person-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    forwardRef(() => CandidatureModule),
    PersonTypeModule,
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    CreatePerson,
    UpdatePerson,
    GetAllPersons,
    GetOnePerson,
    DeleteOnePerson,
  ],
  exports: [
    TypeOrmModule,
    PersonService,
    CreatePerson,
    UpdatePerson,
    GetAllPersons,
    GetOnePerson,
    DeleteOnePerson,
  ],
})
export class PersonModule {}
