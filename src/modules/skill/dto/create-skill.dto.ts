import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
