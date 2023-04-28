import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceRegimeDto } from './create-experience-regime.dto';

export class UpdateExperienceRegimeDto extends PartialType(CreateExperienceRegimeDto) {}
