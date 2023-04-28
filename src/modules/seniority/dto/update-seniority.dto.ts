import { PartialType } from '@nestjs/mapped-types';
import { CreateSeniorityDto } from './create-seniority.dto';

export class UpdateSeniorityDto extends PartialType(CreateSeniorityDto) {}
