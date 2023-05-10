import { VacancySkill } from 'src/modules/vacancy-skill/entities/vacancy-skill.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.skill)
  vacanciesSkills: VacancySkill[];
}
