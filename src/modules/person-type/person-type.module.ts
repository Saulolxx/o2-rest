import { Module } from '@nestjs/common';
import { PersonTypeController } from './person-type.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonType } from './entities/person-type.entity';
import {
  CreatePersonTypeService,
  DeletePersonTypeService,
  GetAllPersonTypeService,
  GetOneByIdPersonTypeService,
  UpdatePersonTypeService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType])],
  controllers: [PersonTypeController],
  providers: [
    CreatePersonTypeService,
    GetOneByIdPersonTypeService,
    GetAllPersonTypeService,
    UpdatePersonTypeService,
    DeletePersonTypeService,
  ],
  exports: [
    CreatePersonTypeService,
    GetOneByIdPersonTypeService,
    GetAllPersonTypeService,
    UpdatePersonTypeService,
    DeletePersonTypeService,
  ],
})
export class PersonTypeModule {}
