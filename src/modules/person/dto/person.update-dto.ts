import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './person.create-dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
