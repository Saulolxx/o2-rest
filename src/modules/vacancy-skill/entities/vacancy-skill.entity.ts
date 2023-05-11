import { Skill } from 'src/modules/skill/entities/skill.entity';
import { Vacancy } from 'src/modules/vacancy/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('VacancySkill')
export class VacancySkill {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacanciesSkills)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;

  @Column({ name: 'vacancy_id', type: 'int' })
  vacancyId: number;

  @ManyToOne(() => Skill, (skill) => skill.vacanciesSkills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({ name: 'skill_id', type: 'int' })
  skillId: number;
}
