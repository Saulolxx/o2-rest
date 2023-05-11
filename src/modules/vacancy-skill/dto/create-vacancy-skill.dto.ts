import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVacancySkillDto {
  @IsNotEmpty()
  @IsNumber()
  skillId: number;
}
