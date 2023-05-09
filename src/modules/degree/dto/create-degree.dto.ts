import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateDegreeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'Title max length 200 characters',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'educationInstitution  max length 200 characters',
  })
  educationInstitution: string;

  @IsNotEmpty()
  @IsDateString()
  startedAt: Date;

  @IsOptional()
  @IsDateString()
  finishedAt: Date;

  @IsOptional()
  @IsNumber()
  degreeModalityID: number;

  @IsOptional()
  @IsNumber()
  degreeSituationID: number;
}
