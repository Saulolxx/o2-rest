import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'Company must be less than 200 characters',
  })
  company: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'Role must be less than 200 characters',
  })
  role: string;

  @IsOptional()
  @IsString()
  @MaxLength(2500, {
    message: 'Description must be less than 2500 characters',
  })
  description: string;

  @IsOptional()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  personID: number;

  @IsOptional()
  @IsNumber()
  experienceModalityID: number;

  @IsOptional()
  @IsNumber()
  experienceRegimeID: number;

  @IsOptional()
  @IsNumber()
  currencyID: number;
}
