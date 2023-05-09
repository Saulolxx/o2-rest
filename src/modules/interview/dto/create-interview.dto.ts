import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateInterviewDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  meetingLink: string;

  @IsNotEmpty()
  @IsNumber()
  candidateId: number;
}
