import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'Title can be of max 200 characters',
  })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Compleoid can be of max 200 characters',
  })
  compleoid: string;

  @IsOptional()
  @IsString()
  @MaxLength(2500, {
    message: 'Description can be of max 2500 characters',
  })
  description: string;
}
