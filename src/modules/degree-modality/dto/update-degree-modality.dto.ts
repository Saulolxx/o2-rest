import { PartialType } from '@nestjs/mapped-types';
import { CreateDegreeModalityDto } from './create-degree-modality.dto';

export class UpdateDegreeModalityDto extends PartialType(
  CreateDegreeModalityDto,
) {}
