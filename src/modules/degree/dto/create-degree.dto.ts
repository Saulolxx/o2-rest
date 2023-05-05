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

  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Title max length 200 characters',
  })
  educationInstitution: string;

  @IsOptional()
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
