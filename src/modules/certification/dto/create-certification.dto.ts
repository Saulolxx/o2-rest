import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateCertificationDto {
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @IsOptional()
  @IsNumber()
  segmentId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500, {
    message: 'Title must be less than 500 characters',
  })
  title: string;

  @IsNotEmpty()
  @IsDateString()
  issuance: Date;

  @IsOptional()
  @IsString()
  @MaxLength(500, {
    message: 'Education Institution must be less than 500 characters',
  })
  educationInstitution: string;

  @IsOptional()
  @IsDateString()
  expiration: Date;
}
