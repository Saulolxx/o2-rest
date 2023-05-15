import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePersonSkillDto {
  @IsNotEmpty()
  @IsNumber()
  skillId: number;
}
