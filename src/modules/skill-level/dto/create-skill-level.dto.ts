import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateSkillLevelDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
