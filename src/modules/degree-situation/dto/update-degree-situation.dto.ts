import { PartialType } from '@nestjs/mapped-types';
import { CreateDegreeSituationDto } from './create-degree-situation.dto';

export class UpdateDegreeSituationDto extends PartialType(CreateDegreeSituationDto) {}
