import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { PersonSkill } from 'src/modules/person-skill/entities/person-skill.entity';
import { VacancySkill } from 'src/modules/vacancy-skill/entities/vacancy-skill.entity';

@Entity('Skill')
export class Skill {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => PersonSkill, (personSkill) => personSkill.skill)
  personsSkills: PersonSkill[];
  @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.skill)
  vacanciesSkills: VacancySkill[];
}
