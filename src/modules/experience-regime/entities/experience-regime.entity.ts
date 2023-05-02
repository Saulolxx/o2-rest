import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('ExperienceRegime')
export class ExperienceRegime {
  @PrimaryColumn()
  id: number;

  @Column({ length: '200', type: 'varchar' })
  label: string;

  @Column({ default: 0, type: 'int' })
  order: number;

  @Column({ default: true, type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Experience, (experience) => experience.experienceRegime)
  experiences: Experience[];
}
