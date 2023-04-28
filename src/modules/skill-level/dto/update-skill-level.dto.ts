import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillLevelDto } from './create-skill-level.dto';

export class UpdateSkillLevelDto extends PartialType(CreateSkillLevelDto) {}
