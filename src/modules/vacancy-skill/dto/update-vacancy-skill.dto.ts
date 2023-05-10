import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateVacancySkillDto {
  @IsNotEmpty()
  @IsNumber()
  skillId: number;
}
