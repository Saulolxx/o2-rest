import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateCandidatureDto {
  @IsNotEmpty()
  @IsNumber()
  vacancyId: number;

  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @IsOptional()
  @IsDateString()
  subscribedAt: Date;
}
