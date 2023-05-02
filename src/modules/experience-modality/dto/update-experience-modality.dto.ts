import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceModalityDto } from './create-experience-modality.dto';

export class UpdateExperienceModalityDto extends PartialType(CreateExperienceModalityDto) {}
