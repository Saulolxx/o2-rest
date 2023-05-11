import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePersonSkillDto {
  @IsNotEmpty()
  @IsNumber()
  skillId: number;
}
