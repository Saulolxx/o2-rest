import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateCandidatureDto {
  @IsOptional()
  @IsNumber()
  vacancyId: number;

  @IsOptional()
  @IsNumber()
  personId: number;

  @IsOptional()
  @IsDateString()
  subscribedAt: Date;
}
